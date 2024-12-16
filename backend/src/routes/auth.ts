import express from "express";
import { check } from "express-validator";
import { login, logout, validateToken } from "../controllers/authController";
import verifyToken from "../middleware/auth";

const loginBodyCheck = [
  check("email", "Email is required").isEmail(),
  check("password", "Password with six or morencharacter is required").isLength(
    {
      min: 6,
    }
  ),
];
const router = express.Router();

router.post("/login", loginBodyCheck, login);
router.get("/validate-token", verifyToken, validateToken);
router.post("/logout", logout);

export default router;
