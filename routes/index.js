import { Router } from "express";
import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import prisma from "../db/client.js";
import passport from "passport";
import multer from "multer";
import authRouter from "./auth.routes.js";
import uploadRouter from "./upload.routes.js";
import userRouter from "./users.routes.js";

export const router = Router();

router.use("/", authRouter);
router.use("/user/", userRouter);

router.get("/", async (req, res) => {
  if (res.locals.currentUser) {
    console.log(res.locals.currentUser.username);
    res.redirect("/user/" + res.locals.currentUser.username);
  } else {
    res.render("index");
  }
});
