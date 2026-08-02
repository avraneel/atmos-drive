import { Router } from "express";
import authRouter from "./auth.routes.js";
import uploadRouter from "./upload.routes.js";
import userRouter from "./users.routes.js";

export const router = Router();

router.use("/user/", userRouter);
router.use("/auth/", authRouter);

router.get("/", async (req, res) => {
  if (res.locals.currentUser) {
    res.redirect("/user/" + res.locals.currentUser.username);
  } else {
    res.render("index");
  }
});
