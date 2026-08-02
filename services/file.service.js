import prisma from "../db/client.js";

export async function createFolder(userId, name, parentFolderId) {
  const folder = await prisma.folder.create({
    data: {
      name: name,
      ownerId: userId,
      parentFolderId: parentFolderId,
    },
  });
  return folder;
}

/**
 * @desc Given a user, return the home folder row from the
 * db
 */
export async function getRootFolder(userId) {
  const folder = await prisma.folder.findFirst({
    where: {
      ownerId: userId,
      parentFolderId: null,
    },
  });
  return folder;
}

export async function getFolder(userId, name, parentFolderId) {
  const folder = await prisma.folder.findFirst({
    where: {
      ownerId: userId,
      name: name,
      parentFolderId: parentFolderId,
    },
  });
  return folder;
}

export async function uploadFile(file, owner) {
  await prisma.file.create({
    data: {
      name: file.filename,
      owner: {
        connect: {
          id: owner.id,
        },
      },
      parentFolder: {
        connect: {
          id: 20,
        },
      },
    },
  });
}

/**
 * @desc Lists all files having the same folder as parent owned
 * by the same user
 */
export async function getFiles(userId, folderId) {
  const files = await prisma.file.findMany({
    where: {
      ownerId: userId,
      parentFolderId: folderId,
    },
  });
  return files;
}

async function deleteFolder(params) {}

/** @desc For a given user and parent folder, list all folders inside it */
export async function getFolders(userId, folderId) {
  const folders = await prisma.folder.findMany({
    where: {
      ownerId: userId,
      parentFolderId: folderId,
    },
  });
  return folders;
}
