/*
  Warnings:

  - You are about to drop the column `intructions` on the `agents` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `agents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agents" DROP COLUMN "intructions",
ADD COLUMN     "instructions" TEXT NOT NULL;
