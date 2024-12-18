import express from "express";
import { addHotel } from "../controllers/myHotelController";
import multer from "multer";
import { body } from "express-validator";
import verifyToken from "../middleware/auth";

const checkBody = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("adultCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Adult Count is required and must be a number"),
  body("childCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Child Count is required and must be a number"),
  body("starRating")
    .notEmpty()
    .isNumeric()
    .withMessage("Star Rating is required and must be a number"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price Per Night is required and must be a number"),
  body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
];

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

const router = express.Router();
router.post(
  "/",
  verifyToken,
  checkBody,
  upload.array("imageFiles", 6),
  addHotel
);

export default router;
