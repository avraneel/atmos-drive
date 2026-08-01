import prisma from "../db/client.js";

const viewController = {
  listFiles: async (req, res) => {
    const username = req.params.username;
    const fileObjectList = await prisma.file.findMany({
      where: {
        ownerId: res.locals.currentUser.id,
      },
    });
    const folderObjectList = await prisma.folder.findMany({
      where: {
        ownerId: res.locals.currentUser.id,
      },
    });
    const elements = [];
    folderObjectList.forEach((item) => {
      elements.push(item.name);
    });
    fileObjectList.forEach((item) => {
      elements.push(item.name);
    });
    res.render("userhome", { username: username, elements: elements });
  },
};

export default viewController;
