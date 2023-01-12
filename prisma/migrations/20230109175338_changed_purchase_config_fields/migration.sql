/*
  Warnings:

  - You are about to drop the column `purchaseConfig` on the `purchase_configs` table. All the data in the column will be lost.
  - You are about to drop the column `rules` on the `purchase_configs` table. All the data in the column will be lost.
  - Added the required column `purchaseRule` to the `purchase_configs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `price_rules` ADD COLUMN `purchaseConfigId` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `purchase_configs` DROP COLUMN `purchaseConfig`,
    DROP COLUMN `rules`,
    ADD COLUMN `purchaseRule` ENUM('RETAIL', 'WHOLESALE') NOT NULL;

-- AddForeignKey
ALTER TABLE `price_rules` ADD CONSTRAINT `price_rules_purchaseConfigId_fkey` FOREIGN KEY (`purchaseConfigId`) REFERENCES `purchase_configs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
