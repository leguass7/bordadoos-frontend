/*
  Warnings:

  - Made the column `value` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Purchase` MODIFY `value` DOUBLE NOT NULL DEFAULT 0;
