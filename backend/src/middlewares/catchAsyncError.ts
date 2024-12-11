import { NextFunction, Request, Response } from "express";

const catchAsyncError =  (Func:(req:Request,res:Response,next:NextFunction)=>void) => (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(Func(req, res, next)).catch(next);
  };

  export default catchAsyncError;