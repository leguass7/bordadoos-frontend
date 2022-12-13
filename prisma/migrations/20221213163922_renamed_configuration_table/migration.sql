/*
  Warnings:

  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Configuration`;

-- CreateTable
CREATE TABLE `configuration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `meta` JSON NULL,
    `actived` BOOLEAN NULL DEFAULT false,
    `updatedBy` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
