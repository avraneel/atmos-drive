import { Router } from "express";
import multer from "multer";
import fileController, {
  getCreateFolderForm,
  createFolderPost,
  getFileUploadForm,
} from "../controllers/file.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = new multer({ storage: storage });

router.get("/file", getFileUploadForm);
router.post("/file", upload.single("file"), fileController.addFileToDb);
router.get("/folder", getCreateFolderForm);
router.post("/folder", createFolderPost);

export default router;
