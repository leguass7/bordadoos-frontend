/*
  Warnings:

  - A unique constraint covering the columns `[doc]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doc` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "doc" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_doc_key" ON "Client"("doc");
