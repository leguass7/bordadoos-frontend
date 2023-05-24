/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `embroidery_images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `embroidery_images` DROP FOREIGN KEY `embroidery_images_purchaseId_fkey`;

-- AlterTable
ALTER TABLE `embroidery_images` DROP COLUMN `purchaseId`;

-- CreateTable
CREATE TABLE `_EmbroideryImageToPurchase` (
    `A` INTEGER UNSIGNED NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmbroideryImageToPurchase_AB_unique`(`A`, `B`),
    INDEX `_EmbroideryImageToPurchase_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmbroideryImageToPurchase` ADD CONSTRAINT `_EmbroideryImageToPurchase_A_fkey` FOREIGN KEY (`A`) REFERENCES `embroidery_images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmbroideryImageToPurchase` ADD CONSTRAINT `_EmbroideryImageToPurchase_B_fkey` FOREIGN KEY (`B`) REFERENCES `purchases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
