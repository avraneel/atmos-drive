import prisma from "../db/client.js";

/**
 * @desc Gets the full path given the current directory
 */
export async function getPath(folderId) {
  const path = [];
  let id = folderId;
  while (id) {
    let { name, parentFolderId } = await getParent(id);
    path.unshift(name);
    id = parentFolderId;
  }
  const pathString = path.join("/");
  return pathString;
}

async function getParent(folderId) {
  const parent = await prisma.folder.findUnique({
    select: {
      name: true,
      parentFolderId: true,
    },
    where: {
      id: folderId,
    },
  });
  return parent;
}

getPath(21);
