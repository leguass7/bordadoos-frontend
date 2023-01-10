/*
  Warnings:

  - You are about to alter the column `purchaseConfigId` on the `price_rules` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UnsignedInt`.
  - The primary key for the `purchase_configs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `purchase_configs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UnsignedInt`.

*/
-- DropForeignKey
ALTER TABLE `price_rules` DROP FOREIGN KEY `price_rules_purchaseConfigId_fkey`;

-- AlterTable
ALTER TABLE `price_rules` MODIFY `purchaseConfigId` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `purchase_configs` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `price_rules` ADD CONSTRAINT `price_rules_purchaseConfigId_fkey` FOREIGN KEY (`purchaseConfigId`) REFERENCES `purchase_configs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
