import { Router } from "express";
import uploadRouter from "./upload.routes.js";
import { listItems } from "../controllers/view.controller.js";
import { resolvePath } from "../middleware/resolvePath.js";
import {
  deleteFilePost,
  deleteFolderPost,
  displayFileInfoPost,
} from "../controllers/file.controller.js";

const router = Router();

router.use("/:username/drive{/*path}/upload", resolvePath, uploadRouter);
router.get("/:username/drive{/*path}", resolvePath, listItems);
router.post("/:username/drive{/*path}/delete-file", deleteFilePost);
router.post("/:username/drive{/*path}/delete-folder", deleteFolderPost);
router.post("/:username/drive{/*path}/info", displayFileInfoPost);

export default router;
