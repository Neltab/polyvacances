/*
  Warnings:

  - Made the column `uuid` on table `Vacation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Vacation` MODIFY `uuid` VARCHAR(191) NOT NULL;
