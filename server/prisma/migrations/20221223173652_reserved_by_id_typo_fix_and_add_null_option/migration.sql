/*
  Warnings:

  - You are about to drop the column `reserverdById` on the `classroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `classroom` DROP FOREIGN KEY `Classroom_managedById_fkey`;

-- DropForeignKey
ALTER TABLE `classroom` DROP FOREIGN KEY `Classroom_reserverdById_fkey`;

-- DropForeignKey
ALTER TABLE `classroom` DROP FOREIGN KEY `Classroom_takenById_fkey`;

-- AlterTable
ALTER TABLE `classroom` DROP COLUMN `reserverdById`,
    ADD COLUMN `reservedById` INTEGER NULL,
    MODIFY `managedById` INTEGER NULL,
    MODIFY `statusId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `reservedAt` DATETIME(3) NULL,
    MODIFY `takenById` INTEGER NULL,
    MODIFY `takenAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Classroom` ADD CONSTRAINT `Classroom_managedById_fkey` FOREIGN KEY (`managedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classroom` ADD CONSTRAINT `Classroom_reservedById_fkey` FOREIGN KEY (`reservedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classroom` ADD CONSTRAINT `Classroom_takenById_fkey` FOREIGN KEY (`takenById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
