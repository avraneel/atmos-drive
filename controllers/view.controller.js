import prisma from "../db/client.js";

const viewController = {
  listFiles: async (req, res) => {
    const username = req.params.username;
    const path = req.params.path || "";
    const baseUrl = req.baseUrl + "/" + username + path;
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
      elements.push({
        name: item.name,
        baseUrl: baseUrl,
        type: "folder",
      });
    });
    fileObjectList.forEach((item) => {
      elements.push({ name: item.name, type: "file" });
    });
    res.locals.pathToAdd = req.originalUrl;
    res.render("userhome", { username: username, elements: elements });
  },

  getPath: async (req, res) => {},
};

export default viewController;
