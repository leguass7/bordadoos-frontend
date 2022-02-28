/*
  Warnings:

  - Added the required column `createdBy` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Purchase` ADD COLUMN `createdBy` INTEGER NOT NULL,
    ADD COLUMN `updatedBy` INTEGER NOT NULL;
