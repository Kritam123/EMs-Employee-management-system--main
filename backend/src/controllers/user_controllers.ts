import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../dbConnect/db";
import bcrypt, { hashSync } from "bcrypt"
import { ApiResponse } from "../utils/ApiResponse";
import jwt, { JwtPayload } from "jsonwebtoken"
import { getAccessToken, getRefreshToken } from "../utils/generateToken";
import cloudinary from "cloudinary"
interface DecodedToken extends JwtPayload {
    id: string;
}
const register = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (
            [firstName, email, lastName, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }
        const isUserExists = await prisma.employee.findUnique({
            where: {
                email
            }
        });
        if (isUserExists) {
            return res.status(403).json(new ApiError(401, "User Already Exists"));
        }
        const getSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, getSalt);

        const newUser = await prisma.employee.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashPassword,

            }
        });
        return res.status(201).json(new ApiResponse(201, { newUser }, "User Registered."));
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, "Internal server Error."))
    }
})
const login = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (
            [email, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json(new ApiError(400, "Email and Password Required!"));
        }
        const isEmailExists = await prisma.employee.findUnique({
            where: {
                email
            }
        })
        if (!isEmailExists) {
            return res.status(400).json(new ApiError(400, "User is not exists"));
        }
        const isPasswordMatch = await bcrypt.compare(password, isEmailExists.password);
        if (!isPasswordMatch) {
            return res.status(400).json(new ApiError(400, "User is not exists"));
        }
        const { id } = isEmailExists;
        const accessToken = getAccessToken({ email, id });
        const refreshToken = getRefreshToken({ id });
        await prisma.employee.update({
            where: {
                id: isEmailExists.id as string
            },
            data: {
                refreshToken
            }
        });
        const options = {
            httpOnly: true,
            secure: false,
        }
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, {}, "User Logged In"));
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, "Internal Server Error"))
    }
});

const generateAccessToken = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json(new ApiError(401, "Token Invalid!"));
        }
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json(new ApiError(401, "Token Invalid!"));
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET!)
        if (!decodedToken) {
            return res.status(401).json(new ApiError(400, "Session Expired!"));
        }
        const { id } = decodedToken as DecodedToken
        const user = await prisma.employee.findUnique({
            where: {
                id
            }
        })
        if (!user) {
            return res.status(401).json(new ApiError(401, "User not found!"));
        }
        const { email } = user;
        const accToken = getAccessToken({ email, id })
        const refToken = getAccessToken({ id })
        return res.status(200).cookie("accessToken", accToken, {
            maxAge: 180000,
            httpOnly: true,
        }).cookie("refreshToken", refToken, {
            maxAge: 432000000,
            httpOnly: true,
        }).json(new ApiResponse(200, {}, "AccessToken Generated"))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error!"))
    }
});

// logout logic 


const logout = catchAsyncError(async (req, res) => {
    await prisma.employee.update({
        where: {
            id: req.user.id
        },
        data: {
            refreshToken: null
        }
    })

    return res
        .status(200)
        .clearCookie("accessToken", { httpOnly: true, secure: false })
        .clearCookie("refreshToken", { httpOnly: true, secure: false })
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const updateUserDetails = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const {firstName,lastName,profileImg} = req.body;
        // Validate inputs
        if ([firstName, lastName].some(field => field?.trim() === "")) {
            return res.status(400).json(new ApiError(400, "firstName and lastName are required"));
        }
        // Update user details first
        await prisma.employee.update({
            where:{
                id:req.user?.id
            },
            data:{
                firstName,
                lastName
            },

        })
      
        // If a file is uploaded, handle Cloudinary upload
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req?.file?.path, {
                folder: "Ems_profile_Img",
                quality: "auto:good",
                fetch_format: "auto"
            });

            // Store Cloudinary URLs in the database
            await prisma.employee.update({
                where: { id: req.user?.id },
                data: {
                    photo_url: JSON.stringify({
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    })
                }
            });
        }

        // Return success response
        return res.status(200).json(new ApiResponse(200, {}, "User Updated!"));

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error!"));
    }
});

const getCurrentUser = catchAsyncError(async (req: Request, res: Response) => {
    try {
        const currentUser = req.user.id;
        if (!currentUser) {
            return res.status(400).json(new ApiError(401, "Unauthorised Access!"));
        }
        const user = await prisma.employee.findUnique({
            where: {
                id: currentUser
            },
            select: {
                address: true,
                firstName: true,
                email: true,
                lastName: true,
                createdAt: true,
                PhoneNo: true,
                photo_url:true,
                updatedAt: true,
                id: true,
            }
        });
        if (!user) {
            return res.status(400).json(new ApiError(404, "User not Exists!"));
        }
        return res.status(200).json(new ApiResponse(200, { user }));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error!"))
    }
});
// change current password

const changeCurrentPassword = catchAsyncError(async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    if (
        [oldPassword, newPassword].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json(new ApiError(400, "oldPassword and newPassword"));
    }
    const user = await prisma.employee.findUnique({
        where: {
            id: req.user.id
        }
    });
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user?.password as string);
    if (!isOldPasswordCorrect) {
        return res.status(400).json(new ApiError(400, "Invalid old password"));
    }
    if (!user) {
        return res.status(400).json(new ApiError(404, "User not Exists!"));
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await prisma.employee.update({
        where: {
            id: req.user.id
        },
        data: {
            password: hashPassword
        }
    })
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

export { register, login, generateAccessToken, updateUserDetails, logout, getCurrentUser, changeCurrentPassword }