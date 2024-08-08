/*
  Warnings:

  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - Added the required column `end` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `endDate`,
    DROP COLUMN `name`,
    DROP COLUMN `startDate`,
    ADD COLUMN `end` DATETIME(3) NOT NULL,
    ADD COLUMN `start` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
