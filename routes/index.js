import { Router } from "express";
import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import { prisma } from "../db/client.js";
import passport from "passport";
import multer from "multer";

export const router = Router();
const upload = new multer({ dest: "uploads/" });

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

router.get("/", (req, res) => {
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
  console.log("this should not happening");
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: {
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
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

router.post("/upload", upload.single("file"), function (req, res, next) {
  const file = req.file;
  res.redirect("/");
});
