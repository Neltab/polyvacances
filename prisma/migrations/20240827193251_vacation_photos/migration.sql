-- CreateTable
CREATE TABLE `VacationPhotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photoUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `vacationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VacationPhotos` ADD CONSTRAINT `VacationPhotos_vacationId_fkey` FOREIGN KEY (`vacationId`) REFERENCES `Vacation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
