import { Router } from "express";
import passport from "passport";
import { body, validationResult, matchedData } from "express-validator";
import prisma from "../db/client.js";
import authController from "../controllers/auth.controller.js";

const router = Router();

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

router.get("/register", authController.getRegister);
router.post("/register", validateUser, authController.registerUser);

router.get("/login", authController.getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.locals.cwd = req.user.username;
    res.redirect(`/user/${req.user.username}/drive/`);
  },
);

router.get("/logout", authController.getLogout);

export default router;
