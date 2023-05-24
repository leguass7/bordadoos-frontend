/*
  Warnings:

  - You are about to drop the column `duplicated` on the `embroidery_images` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `embroidery_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `embroidery_images` DROP COLUMN `duplicated`,
    DROP COLUMN `hash`;
