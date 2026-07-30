/*
  Warnings:

  - You are about to drop the column `paerentFolderId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_paerentFolderId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "paerentFolderId";
