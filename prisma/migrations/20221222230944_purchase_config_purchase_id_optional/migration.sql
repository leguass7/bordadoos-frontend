-- DropForeignKey
ALTER TABLE `purchase_configs` DROP FOREIGN KEY `purchase_configs_purchaseId_fkey`;

-- AlterTable
ALTER TABLE `purchase_configs` MODIFY `purchaseId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `purchase_configs` ADD CONSTRAINT `purchase_configs_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
