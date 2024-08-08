/*
  Warnings:

  - Added the required column `link` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `link` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NULL;
