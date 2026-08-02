import prisma from "../db/client.js";
import { createFolder, uploadFile } from "../services/file.service.js";

export function getFileUploadForm(req, res) {
  /**
   * for the ejs, when we click on the sidelink from
   * the file explorer menu, then the <%= url %> is the normal
   * folder url on which we add our /upload/file.
   * But now when we click from /upload, then we need to omit the
   * extra /upload
   */
  const newUrl = omitLast(req.baseUrl);
  console.log(newUrl);
  res.render("uploadFile", {
    url: newUrl,
  });
}

export async function uploadFilePost(req, res) {
  const folderId = res.locals.folderId;
  const newUrl = omitLast(req.baseUrl);
  console.log(req.user.id);
  const uploadedFile = await uploadFile(req.user.id, req.file, folderId);
  res.redirect(`${newUrl}`);
}

export function getCreateFolderForm(req, res) {
  const newUrl = omitLast(req.baseUrl);
  res.render("newFolder", {
    url: newUrl,
  });
}

export async function createFolderPost(req, res) {
  const folderId = res.locals.folderId;
  const newUrl = omitLast(req.baseUrl);
  const createdFolder = await createFolder(
    req.user.id,
    req.body.foldername,
    folderId,
  );
  res.redirect(`${newUrl}`);
}

function omitLast(url) {
  return url.slice(0, url.lastIndexOf("/"));
}

const controller = {
  getFolderForm: (req, res) => {
    const username = res.locals.currentUser.username;
    res.render("newFolder", { username: username });
  },

  createFolder: async (req, res) => {
    const userid = res.locals.currentUser.id;
    await prisma.folder.create({
      data: {
        name: req.body.foldername,
        owner: {
          connect: {
            id: res.locals.currentUser.id,
          },
        },
        parentFolder: {
          connect: {},
        },
      },
    });
    res.redirect("../drive");
  },

  getFileForm: (req, res) => {
    const username = res.locals.currentUser.username;
    res.render("uploadFile", { username: username });
  },

  addFileToDb: async (req, res) => {
    await uploadFile(req.file, res.locals.currentUser);
    res.redirect("../drive");
  },

  getPath: (req, res) => {},
};

export default controller;
