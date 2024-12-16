import express from "express";
import { register } from "../controllers/usersController";
import { check } from "express-validator";
const checkRegisterBody = [
  check("firstName", "First Name Is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email Name is required").isEmail(),
  check("password", "Password with 6 or more character is required").isLength({
    min: 6,
  }),
];

const router = express.Router();

router.post("/register", checkRegisterBody, register);

export default router;
