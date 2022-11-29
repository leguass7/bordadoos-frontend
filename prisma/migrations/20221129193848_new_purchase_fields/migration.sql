-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `entryDate` DATETIME(3) NULL,
    ADD COLUMN `label` VARCHAR(100) NULL,
    ADD COLUMN `points` INTEGER NULL;
