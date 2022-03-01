/*
  Warnings:

  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Purchase`;

-- CreateTable
CREATE TABLE `purchases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL DEFAULT 0,
    `clientId` INTEGER NOT NULL,
    `typeId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `qtd` INTEGER NULL DEFAULT 0,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NOT NULL,
    `actived` BOOLEAN NULL DEFAULT true,
    `done` BOOLEAN NULL DEFAULT false,
    `paid` BOOLEAN NULL DEFAULT false,
    `deliveryDate` DATETIME(3) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `embroidery_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `embroidery_positions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
