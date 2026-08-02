import prisma from "../db/client.js";

/**
 * @desc Gets the full path given the current directory
 */
function getPath(folderId) {
    const parent = await prisma.folder.findUnique({
        select: {
            parentFolder,
        },
        where: {
            id: folderId
        }
    })
}
