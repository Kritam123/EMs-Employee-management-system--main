import express, { Request, Response } from "express"
import dotenv from "dotenv";
import cors from "cors"
import morgan from "morgan";
import helmet from "helmet";
import { userRoutes } from "./routes/user_routes";
import { orgRoutes } from "./routes/org_routes";
import ErrorMiddlewares from "./middlewares/error";
import cookieParser from "cookie-parser"
import {v2 as Cloudinary} from "cloudinary";
const app = express();
dotenv.config({})

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials:true
  }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ xssFilter: true }));
app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});
Cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    api_key:process.env.CLOUDINARY_API_KEY
 })

// api ends
// user
app.use("/api/v1/user", userRoutes);

// org

app.use("/api/v1/organization", orgRoutes)


// error handling 

app.use(ErrorMiddlewares)
app.all("*",(req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl}not found`)
    res.status(404)
    next(err)
  })
app.listen(process.env.PORT, () => {
    console.log("Server connected");
});
process.on("uncaughtException", (err: any) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception`)
    process.exit(1);
})
// unhandled promise Rejection
process.on("unhandledRejection", (err: any) => {
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise Rejection`);
})