-- CreateTable
CREATE TABLE `purchase_items` (
    `id` VARCHAR(36) NOT NULL,
    `purchaseId` INTEGER NOT NULL,
    `originalValue` DOUBLE NOT NULL DEFAULT 0,
    `totalValue` DOUBLE NOT NULL DEFAULT 0,
    `rules` JSON NOT NULL,
    `purchaseConfig` JSON NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchase_items` ADD CONSTRAINT `purchase_items_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
