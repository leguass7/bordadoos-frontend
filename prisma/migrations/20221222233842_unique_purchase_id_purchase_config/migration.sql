/*
  Warnings:

  - A unique constraint covering the columns `[purchaseId]` on the table `purchase_configs` will be added. If there are existing duplicate values, this will fail.
  - Made the column `purchaseId` on table `purchase_configs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `purchase_configs` DROP FOREIGN KEY `purchase_configs_purchaseId_fkey`;

-- AlterTable
ALTER TABLE `purchase_configs` MODIFY `purchaseId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `purchase_configs_purchaseId_key` ON `purchase_configs`(`purchaseId`);

-- AddForeignKey
ALTER TABLE `purchase_configs` ADD CONSTRAINT `purchase_configs_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
