import { Router } from "express";
import { generateAccessToken, login, logout, register, updateUserDetails, getCurrentUser, changeCurrentPassword } from "../controllers/user_controllers";
import { verifyAuth } from "../middlewares/verifyAuth";
import multer from "multer";
const storage = multer.diskStorage({
      filename:(req,file,cb)=>{
        cb(null,file.originalname)
      }
  });
const upload = multer({ storage });
export const userRoutes = Router();
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/refresh/token", generateAccessToken)
userRoutes.post("/logout", verifyAuth, logout)
userRoutes.patch("/update/me",verifyAuth,upload.single("profileImg"),updateUserDetails);
userRoutes.get("/me", verifyAuth, getCurrentUser)
userRoutes.post("/password/change", verifyAuth, changeCurrentPassword)