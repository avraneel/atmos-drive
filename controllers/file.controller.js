import prisma from "../db/client.js";
import { createFolder, uploadFile } from "../services/file.service.js";

export function getFileUploadForm(req, res) {
  res.render("uploadFile", { username: res.locals.currentUser.username });
}

export async function createFolderPost(req, res) {
  const folderId = res.locals.folderId;
  const createdFolder = await createFolder(
    req.user.id,
    req.body.foldername,
    folderId,
  );
  res.redirect(`/user/${req.user.username}/drive`);
}

export function getCreateFolderForm(req, res) {
  res.render("newFolder", { username: res.locals.currentUser.username });
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
