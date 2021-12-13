/*
  Warnings:

  - You are about to drop the column `userId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `embroidery_types` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `clients` DROP FOREIGN KEY `clients_userId_fkey`;

-- DropForeignKey
ALTER TABLE `embroidery_types` DROP FOREIGN KEY `embroidery_types_userId_fkey`;

-- AlterTable
ALTER TABLE `clients` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `embroidery_types` DROP COLUMN `userId`;
