-- AlterTable
ALTER TABLE `purchases` MODIFY `deliveryDate` DATE NULL;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
