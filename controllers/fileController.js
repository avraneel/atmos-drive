import { prisma } from "../db/client.js";

const fileController = {
  createFolder: async (req, res) => {
    await prisma.folder.create({
      data: {
        name: req.body.foldername,
        creationTime: new Date(),
        parentFolderId: 1,
      },
    });
    res.redirect("/");
  },

  addFileToDb: async (req, res) => {
    (await prisma.file.create({
      data: {
        name: req.file.filename,
        user: {
          connect: {
            username: res.locals.currentUser.username,
          },
        },
        parentFolder: {
          connect: {
            id: 4,
          },
        },
        path: req.file.path,
        uploadTime: new Date(),
      },
    }),
      res.redirect("/"));
  },
};

export default fileController;

/**
 * I need to add files in here, and I need to store the files in my
 * multer disk to my database. how do I do that?
 * I also need to output the current path of the user, so user
 * should have a current path pointer to him
 */
