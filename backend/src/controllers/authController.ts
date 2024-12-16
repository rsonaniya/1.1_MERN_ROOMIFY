import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credential" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credential" });
      return;
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).send({ userId: req.userId });
};

export const logout = async (req: Request, res: Response) => {
  res
    .cookie("auth_token", "", {
      expires: new Date(0),
    })
    .send({ message: "Logged out successfully" });
};
