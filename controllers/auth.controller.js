import { body, validationResult, matchedData } from "express-validator";
import userService from "../services/user.service.js";

const alphaErr = `must contain alphabets only.`;
const lengthErr = `must be between 1 and 30 characters`;

const controller = {
  getRegister: (req, res) => {
    res.render("register");
  },

  registerUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).render("register", { errors: errors.array() });
    }
    const user = await userService.createUser(req.body);
    res.redirect("/auth/login");
  },

  getLogin: (req, res) => {
    res.render("login");
  },

  getLogout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
};

export default controller;
