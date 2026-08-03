/*
  Warnings:

  - You are about to drop the column `uploadItem` on the `File` table. All the data in the column will be lost.
  - Added the required column `uploadTime` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "uploadItem",
ADD COLUMN     "uploadTime" TIMESTAMP(3) NOT NULL;
