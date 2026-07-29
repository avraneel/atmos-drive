/*
  Warnings:

  - Added the required column `upload_time` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "upload_time" TIMESTAMP(3) NOT NULL;
