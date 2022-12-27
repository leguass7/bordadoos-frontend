/*
  Warnings:

  - A unique constraint covering the columns `[providerAccountId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `accounts_providerAccountId_key` ON `accounts`(`providerAccountId`);
