-- AlterTable
ALTER TABLE `EventPhotos` ADD COLUMN `type` ENUM('photo', 'video') NOT NULL DEFAULT 'photo';

-- AlterTable
ALTER TABLE `VacationPhotos` ADD COLUMN `type` ENUM('photo', 'video') NOT NULL DEFAULT 'photo';
