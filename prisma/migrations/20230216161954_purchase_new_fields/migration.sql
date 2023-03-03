-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `clientObs` TEXT NULL,
    ADD COLUMN `employeeObs` TEXT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;
