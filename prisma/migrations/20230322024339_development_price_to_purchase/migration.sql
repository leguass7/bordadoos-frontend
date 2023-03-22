/*
  Warnings:

  - You are about to drop the column `developmentPrice` on the `purchase_configs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `purchase_configs` DROP COLUMN `developmentPrice`;

-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `developmentPrice` DOUBLE NOT NULL DEFAULT 35;
