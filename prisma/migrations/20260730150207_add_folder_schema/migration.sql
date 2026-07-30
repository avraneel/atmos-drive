/*
  Warnings:

  - You are about to drop the column `title` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `upload_time` on the `File` table. All the data in the column will be lost.
  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paerentFolderId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadTime` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "title",
DROP COLUMN "upload_time",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paerentFolderId" INTEGER NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "uploadTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL,
    "path" TEXT NOT NULL,
    "parentFolderId" INTEGER NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_paerentFolderId_fkey" FOREIGN KEY ("paerentFolderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
