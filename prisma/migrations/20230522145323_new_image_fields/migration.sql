/*
  Warnings:

  - You are about to drop the column `note` on the `embroidery_images` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `embroidery_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `embroidery_images` DROP COLUMN `note`,
    DROP COLUMN `title`,
    ADD COLUMN `type` VARCHAR(191) NULL;
