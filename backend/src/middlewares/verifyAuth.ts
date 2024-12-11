import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../dbConnect/db";
import { Employee } from "@prisma/client";

declare global {
    namespace Express {
      interface Request {
        user: Employee 
      }
    }
  }
interface DecodedToken extends JwtPayload {
    id: string; 
}
const verifyAuth = catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
   const token = req.cookies?.accessToken;
   console.log(token);
   if(!token) {
    return res.status(401).json(new ApiError(401,"Unauthorized Access!"));
   }
   jwt.verify(token, process.env.ACCESSTOKEN_SECRET!, async(err:Error| null,decoded:any) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).clearCookie("accessToken",{httpOnly:true,secure:false}).clearCookie("refreshToken",{httpOnly:true,secure:false}).json(new ApiError(401, "Session Expired!"));
    } else {
        const {id} = decoded as DecodedToken;
      const user = await prisma.employee.findUnique({
        where:{
            id
        }
      })
      if (!user) {
        return res.status(401).json(new ApiError(401, "User not found!"));
      }
     req.user = user;
    }
  next();
  });
})

export {verifyAuth};