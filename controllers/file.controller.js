import prisma from "../db/client.js";

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
    res.redirect("/");
  },

  getFileForm: (req, res) => {
    const username = res.locals.currentUser.username;
    res.render("uploadFile", { username: username });
  },

  addFileToDb: async (req, res) => {
    (await prisma.file.create({
      data: {
        name: req.file.filename,
        owner: {
          connect: {
            id: res.locals.currentUser.id,
          },
        },
        parentFolder: {
          connect: {
            id: 6,
          },
        },
      },
    }),
      res.redirect("/"));
  },

  getPath: (req, res) => {},
};

export default controller;
