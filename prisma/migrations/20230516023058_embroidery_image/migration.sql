-- CreateTable
CREATE TABLE `embroidery_images` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `uri` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `size` INTEGER NULL,
    `duplicated` BOOLEAN NULL,
    `createdBy` INTEGER NOT NULL,
    `purchaseId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `embroidery_images` ADD CONSTRAINT `embroidery_images_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `embroidery_images` ADD CONSTRAINT `embroidery_images_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
