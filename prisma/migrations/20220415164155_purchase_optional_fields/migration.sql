-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `purchases_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `purchases_typeId_fkey`;

-- AlterTable
ALTER TABLE `purchases` MODIFY `typeId` INTEGER NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `embroidery_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `embroidery_positions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
