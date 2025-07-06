/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `verification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `verification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,token]` on the table `verification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires` to the `verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verification" DROP COLUMN "expiresAt",
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_key" ON "verification"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_identifier_token_key" ON "verification"("identifier", "token");
