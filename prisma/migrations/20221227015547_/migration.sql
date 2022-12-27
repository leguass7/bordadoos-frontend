/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `verification_requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `verification_requests_identifier_key` ON `verification_requests`(`identifier`);
