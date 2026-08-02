import { Router } from "express";
import passport from "passport";
import { body, validationResult, matchedData } from "express-validator";
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
router.get("/logout", authController.getLogout);
router.get("/login", authController.getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect(`/user/${req.user.username}/drive`);
  },
);

export default router;
