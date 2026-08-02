import { Router } from "express";
import prisma from "../db/client.js";
import uploadRouter from "./upload.routes.js";
import viewController from "../controllers/view.controller.js";

const router = Router();

router.use("/:username/upload", uploadRouter);

router.get("/:username{/*path}", viewController.listFiles);

export default router;
