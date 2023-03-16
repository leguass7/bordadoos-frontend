/*
  Warnings:

  - You are about to drop the column `purchaseConfigId` on the `price_rules` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `price_rules` DROP FOREIGN KEY `price_rules_purchaseConfigId_fkey`;

-- AlterTable
ALTER TABLE `price_rules` DROP COLUMN `purchaseConfigId`;

-- CreateTable
CREATE TABLE `_PriceRulesToPurchaseConfig` (
    `A` INTEGER NOT NULL,
    `B` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `_PriceRulesToPurchaseConfig_AB_unique`(`A`, `B`),
    INDEX `_PriceRulesToPurchaseConfig_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PriceRulesToPurchaseConfig` ADD CONSTRAINT `_PriceRulesToPurchaseConfig_A_fkey` FOREIGN KEY (`A`) REFERENCES `price_rules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PriceRulesToPurchaseConfig` ADD CONSTRAINT `_PriceRulesToPurchaseConfig_B_fkey` FOREIGN KEY (`B`) REFERENCES `purchase_configs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
