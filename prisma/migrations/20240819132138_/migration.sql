/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Vacation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Vacation` ADD COLUMN `uuid` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Vacation_uuid_key` ON `Vacation`(`uuid`);
