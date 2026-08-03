import {
  createFolder,
  deleteFile,
  deleteFolder,
  uploadFile,
} from "../services/file.service.js";

export function getFileUploadForm(req, res) {
  /**
   * for the ejs, when we click on the sidelink from
   * the file explorer menu, then the <%= url %> is the normal
   * folder url on which we add our /upload/file.
   * But now when we click from /upload, then we need to omit the
   * extra /upload
   */
  const newUrl = getPrevUrl(req.baseUrl);
  console.log(newUrl);
  res.render("uploadFile", {
    url: newUrl,
  });
}

export async function uploadFilePost(req, res) {
  const folderId = res.locals.folderId;
  const newUrl = getPrevUrl(req.baseUrl);
  console.log(req.user.id);
  const uploadedFile = await uploadFile(req.user.id, req.file, folderId);
  res.redirect(`${newUrl}`);
}

export async function deleteFilePost(req, res) {
  const fileId = Number(req.body.fileId);
  const userId = req.user.id;
  const deletedFile = await deleteFile(userId, fileId);
  res.redirect(req.baseUrl + getPrevUrl(req.url));
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
  const createdFolder = await createFolder(
    req.user.id,
    req.body.foldername,
    folderId,
  );
  res.redirect(`${newUrl}`);
}

export async function deleteFolderPost(req, res) {
  const folderId = Number(req.body.folderId);
  console.log(folderId);
  const userId = req.user.id;
  const deletedFolder = await deleteFolder(userId, folderId);
  res.redirect(req.baseUrl + getPrevUrl(req.url));
}

function getPrevUrl(url) {
  return url.slice(0, url.lastIndexOf("/"));
}
