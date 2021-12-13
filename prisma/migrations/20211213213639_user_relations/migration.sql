/*
  Warnings:

  - You are about to drop the `embroiderytypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedBy` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `embroiderytypes` DROP FOREIGN KEY `embroiderytypes_createdBy_fkey`;

-- AlterTable
ALTER TABLE `clients` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NOT NULL;

-- DropTable
DROP TABLE `embroiderytypes`;

-- CreateTable
CREATE TABLE `embroidery_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `actived` BOOLEAN NOT NULL DEFAULT true,
    `image` VARCHAR(191) NULL,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `embroidery_types` ADD CONSTRAINT `embroidery_types_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `embroidery_types` ADD CONSTRAINT `embroidery_types_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `embroidery_types` ADD CONSTRAINT `embroidery_types_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
