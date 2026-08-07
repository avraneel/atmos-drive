import {
  createFolder,
  deleteFile,
  deleteFolder,
  getFileInfo,
  uploadFile,
} from "../services/file.service.js";
import { decode } from "base64-arraybuffer";
import supabase from "../db/supabase.client.js";

export function getFileUploadForm(req, res) {
  /**
   * for the ejs, when we click on the sidelink from
   * the file explorer menu, then the <%= url %> is the normal
   * folder url on which we add our /upload/file.
   * But now when we click from /upload, then we need to omit the
   * extra /upload
   */
  const newUrl = getPrevUrl(req.baseUrl);
  res.render("uploadFile", {
    url: newUrl,
  });
}

export async function uploadFilePost(req, res) {
  try {
    const folderId = res.locals.folderId;
    const file = req.file;
    console.log(file);
    const fileBase64 = decode(file.buffer.toString("base64"));
    const { data, error } = await supabase.storage
      .from("upload")
      .upload(file.originalname, fileBase64, {
        cacheControl: "3600",
        upsert: true,
      });
    console.log(data);
    if (error) {
      throw error;
    } else {
      const newUrl = getPrevUrl(req.baseUrl);
      const uploadedFile = await uploadFile(
        req.user.id,
        req.file,
        folderId,
        data.fullPath,
      );
      res.redirect(`${newUrl}`);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function deleteFilePost(req, res) {
  try {
    const fileId = Number(req.body.fileId);
    const userId = req.user.id;
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove([`upload/${fileId}`]);
    console.log(data);
    const deletedFile = await deleteFile(userId, fileId);
    res.redirect(req.baseUrl + getPrevUrl(req.url));
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export function getCreateFolderForm(req, res) {
  const newUrl = getPrevUrl(req.baseUrl);
  res.render("newFolder", {
    url: newUrl,
  });
}

export async function createFolderPost(req, res) {
  const folderId = res.locals.folderId;
  const newUrl = getPrevUrl(req.baseUrl);
  console.log(req.baseUrl);
  const createdFolder = await createFolder(
    req.user.id,
    req.body.foldername,
    folderId,
  );
  res.redirect(`${newUrl}`);
}

export async function deleteFolderPost(req, res) {
  const folderId = Number(req.body.folderId);
  const userId = req.user.id;
  const deletedFolder = await deleteFolder(userId, folderId);
  res.redirect(req.baseUrl + getPrevUrl(req.url));
}

export async function displayFileInfoPost(req, res) {
  const fileId = Number(req.body.fileId);
  const userId = req.user.id;
  const fileInfo = await getFileInfo(userId, fileId);
  const item = {
    name: fileInfo.name,
    size: `${fileInfo.size} bytes`,
    uploadTime: `${fileInfo.uploadTime.toDateString()}, ${fileInfo.uploadTime.toTimeString()}`,
  };
  console.log(fileInfo.uploadTime.toTimeString());
  const prevUrl = getPrevUrl(req.url);
  res.render("info", { item: item, prevUrl: req.baseUrl + prevUrl });
}

export async function downloadFile(req, res) {
  const fileId = Number(req.body.fileId);
  const userId = req.user.id;
  const file = await getFileInfo(userId, fileId);
  const filePath = req.baseUrl + getPrevUrl(req.url);
  res.download(filePath);
}

function getPrevUrl(url) {
  return url.slice(0, url.lastIndexOf("/"));
}
