import prisma from "../db/client.js";

const fileController = {
  createFolder: async (req, res) => {
    await prisma.folder.create({
      data: {
        name: req.body.foldername,
        owner: {
          connect: {
            id: res.locals.currentUser.id,
          },
        },
      },
    });
    res.redirect("/");
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
};

export default fileController;

/**
 * I need to add files in here, and I need to store the files in my
 * multer disk to my database. how do I do that?
 * I also need to output the current path of the user, so user
 * should have a current path pointer to him
 */
