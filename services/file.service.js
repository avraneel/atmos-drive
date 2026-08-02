import prisma from "../db/client.js";

async function createFolder(userId, folderId) {}

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

async function listFiles(params) {}

async function deleteFolder(params) {}

async function listSubfolders(folderName) {}
