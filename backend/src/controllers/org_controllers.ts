import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../dbConnect/db";
import { Role } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const createOrg = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currEmployeeId = req.user.id;
      const { orgName } = req.body;
      if (!orgName) {
        return res
          .status(400)
          .json(new ApiError(400, "Organization Name is Missing!"));
      }
      const createOrg = await prisma.organization.create({
        data: {
          orgName,
          createdId: currEmployeeId,
          memberInviteCode: uuidv4(),
          orgMembers: {
            create: [{ employeeId: currEmployeeId, role: Role.ADMIN }],
          },
        },
      });
      return res
        .status(201)
        .json(new ApiResponse(201, { createOrg }, "Organization Created"));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Internal Server Error"));
    }
  }
);

const memberInvitation = catchAsyncError(
  async (req: Request, res: Response) => {
    try {
      const employeeId = req?.user?.id;
      const { memberInviteCode } = req.params;
      if (!memberInviteCode) {
        return res
          .status(400)
          .json(new ApiError(400, "MemberInviteCode is Missing"));
      }
      let org;
      org = await prisma.organization.findFirst({
        where: {
          memberInviteCode: memberInviteCode,
          orgMembers: {
            some: {
              employeeId,
            },
          },
        },
      });
      if (org) {
        return res
          .status(200)
          .json(new ApiResponse(200, { org }, "Updated OrgMember"));
      }
      org = await prisma.organization.update({
        where: {
          memberInviteCode,
        },
        data: {
          orgMembers: {
            create: [{ employeeId }],
          },
        },
      });
      return res
        .status(201)
        .json(new ApiResponse(201, { org }, "Updated OrgMember"));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(new ApiResponse(500, "Internal Server Error"));
    }
  }
);
const getOrgById = catchAsyncError(async (req: Request, res: Response) => {
  try {
    // const currEmployeeId = req.user.id;
    const { orgId } = req.params;
    const org = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        orgMembers: {
          select: {
            employee: {
              select: {
                firstName: true,
                email: true,
                id: true,
                PhoneNo: true,
                photo_url: true,
                lastName: true,
                address: true,
              },
            },
            id: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            employeeId:true
          },
        },
      },
    });
    if (!org) {
      return res.status(404).json(new ApiError(404, "Org not found!"));
    }
    return res.status(200).json({ org });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});
const getAllOrgGetByUser = catchAsyncError(
  async (req: Request, res: Response) => {
    try {
      const employeeId = req.user.id;
      const allOrg = await prisma.organization.findMany({
        where: {
          orgMembers: {
            some: {
              employeeId,
            },
          },
        },
      });
      if (!allOrg) {
        return res.status(404).json(new ApiError(404, "Org not found!"));
      }
      return res.status(200).json({ allOrg });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(new ApiResponse(500, "Internal Server Error"));
    }
  }
);
const updateLastAccess = catchAsyncError(
  async (req: Request, res: Response) => {
    const { orgId } = req.params;
    try {
      const org = await prisma.organization.findUnique({
        where: {
          id: orgId,
        },
      });
      if (!org) {
        return res.status(404).json(new ApiError(404, "Org not found!"));
      }
      await prisma.organization.update({
        where: {
          id: orgId,
          orgMembers: {
            some: {
              employeeId: req?.user?.id,
            },
          },
        },
        data: { lastAccessed: new Date() },
      });
      return res.status(201).json(new ApiResponse(201, {}, "Update"));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(new ApiResponse(500, "Internal Server Error"));
    }
  }
);
export {
  createOrg,
  updateLastAccess,
  memberInvitation,
  getOrgById,
  getAllOrgGetByUser,
};
