import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from "cloudinary";
import { HotelType } from '../models/hotel';

const router = express.Router();

const storage = multer.memoryStorage(); // tells ulter to store files that we get from post request
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    }
}) // it is a middleware

// api/my-hotels
// we will pass data in form a multi-part form insted of json and for that we are using multer
router.post("/", upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;


        // 1) upload the images to cloudinary

        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64"); // converts image to base64 string for cloudinary
            let dataURI = "data:" + image.mimetype + ";base," + 64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        // 2) if upload successful, add the URLs to the new hotel
        // 3) save the new hotel in our database
        // 4) return a 201 status
    } catch (e) {
        console.log("Error creating hotel: ", e);
        res.status(500).json({ message: "Something went wrong" });
    }
});