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

export async function uploadFile(userId, file, parentFolderId) {
  const createdFile = await prisma.file.create({
    data: {
      name: file.originalname,
      size: file.size,
      uploadTime: new Date(),
      ownerId: userId,
      parentFolderId: parentFolderId,
      url: "abc",
    },
  });
  return createdFile;
}

/**
 * @desc Lists all files having the same folder as parent owned
 * by the same user
 */
export async function getFiles(userId, parentFolderId) {
  const files = await prisma.file.findMany({
    where: {
      ownerId: userId,
      parentFolderId: parentFolderId,
    },
  });
  return files;
}

export async function deleteFile(userId, fileId) {
  const deleteFile = await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
}

// TODO check for 2 users with same folder in same path if i delete one
// other should not delete
export async function deleteFolder(userId, folderIdToDelete) {
  const deleteFiles = await prisma.file.deleteMany({
    where: {
      parentFolderId: folderIdToDelete,
    },
  });
  const deleteFolder = await prisma.folder.delete({
    where: {
      id: folderIdToDelete,
    },
  });
  return deleteFolder;
}

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

export async function getFileInfo(userId, fileId) {
  const fileInfo = await prisma.file.findFirst({
    select: {
      name: true,
      size: true,
      uploadTime: true,
    },
    where: {
      id: fileId,
    },
  });

  return fileInfo;
}
