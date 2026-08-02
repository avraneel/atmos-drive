import { Router } from "express";
import uploadRouter from "./upload.routes.js";
import { listItems } from "../controllers/view.controller.js";
import { resolvePath } from "../middleware/resolvePath.js";

const router = Router();

router.use("/:username/upload", resolvePath, uploadRouter);
router.get("/:username/drive{/*path}", resolvePath, listItems);

export default router;
