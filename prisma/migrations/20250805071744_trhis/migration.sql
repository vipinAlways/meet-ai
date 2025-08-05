/*
  Warnings:

  - You are about to drop the column `transcriptUrlrl` on the `meetings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meetings" DROP COLUMN "transcriptUrlrl",
ADD COLUMN     "transcriptUrl" TEXT;
