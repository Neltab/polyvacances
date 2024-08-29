/*
  Warnings:

  - You are about to drop the column `vacationId` on the `VacationPhotos` table. All the data in the column will be lost.
  - Added the required column `vacationUUID` to the `VacationPhotos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `VacationPhotos` DROP FOREIGN KEY `VacationPhotos_vacationId_fkey`;

-- AlterTable
ALTER TABLE `VacationPhotos` DROP COLUMN `vacationId`,
    ADD COLUMN `vacationUUID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `VacationPhotos` ADD CONSTRAINT `VacationPhotos_vacationUUID_fkey` FOREIGN KEY (`vacationUUID`) REFERENCES `Vacation`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
