import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose'; // lets us connect to database and interact with it
import userRoutes from './routes/users';
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import { cookie } from 'express-validator';
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express() // creates an express app
app.use(cookieParser())
app.use(express.json()) // helps convert the body of api request to convert to json format automatically
app.use(express.urlencoded({ extended: true })) // helps parse end url
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})) // our server will only accept and process requests from this particular URL and that URL must contain credentials.

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(5000, () => {
    console.log("server running");
})