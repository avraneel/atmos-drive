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
};

export default fileController;
