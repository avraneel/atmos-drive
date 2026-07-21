import { Router } from "express";
import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import { client } from "../db/client.js";

export const router = Router();

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

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", validateUser, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).render("register", { errors: errors.array() });
  }
  console.log("this should not happening");
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await client.user.create({
    data: {
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
    },
  });
  res.redirect("/login");
});
