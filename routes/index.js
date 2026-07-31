import { Router } from "express";
import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import { prisma } from "../db/client.js";
import passport from "passport";
import multer from "multer";
import uploadRouter from "./upload.routes.js";

export const router = Router();

router.use("/upload", uploadRouter);

const alphaErr = `must contain alphabets only.`;
const lengthErr = `must be between 1 and 30 characters`;

const validateUser = [
  body("fullname")
    .trim()
    .isAlpha()
    .withMessage(`Full name ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Full name ${lengthErr}`),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords must match`),
];

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", validateUser, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).render("register", { errors: errors.array() });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: {
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
      folders: {
        create: {
          name: "/",
        },
      },
    },
  });
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
