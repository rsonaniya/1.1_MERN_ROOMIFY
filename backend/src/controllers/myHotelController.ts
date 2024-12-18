import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";

export const addHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;
    //1. upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    console.log(imageUrls);
    //2. if upload is success, add urls to new hotel

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdate = new Date();
    newHotel.userId = req.userId;
    //3. save the new hotel in our db
    const hotel = new Hotel(newHotel);
    await hotel.save();
    //4. return 201
    res.status(201).send(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
