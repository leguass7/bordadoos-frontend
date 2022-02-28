-- CreateTable
CREATE TABLE `Purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DECIMAL(65, 30) NULL DEFAULT 0,
    `clientId` INTEGER NOT NULL,
    `typeId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `qtd` INTEGER NULL DEFAULT 0,
    `actived` BOOLEAN NULL DEFAULT true,
    `done` BOOLEAN NULL DEFAULT false,
    `paid` BOOLEAN NULL DEFAULT false,
    `deliveryDate` DATETIME(3) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
