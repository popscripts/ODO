/*
  Warnings:

  - You are about to drop the column `accountType` on the `accounttype` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `status` table. All the data in the column will be lost.
  - Added the required column `name` to the `AccountType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OpenDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dishId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `classroom` DROP FOREIGN KEY `Classroom_reservedById_fkey`;

-- DropForeignKey
ALTER TABLE `classroom` DROP FOREIGN KEY `Classroom_takenById_fkey`;

-- AlterTable
ALTER TABLE `accounttype` DROP COLUMN `accountType`,
    ADD COLUMN `name` VARCHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE `info` MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `openday` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `order`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `comment` VARCHAR(255) NOT NULL,
    ADD COLUMN `dishId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `status` DROP COLUMN `status`,
    ADD COLUMN `name` VARCHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `groupId` INTEGER NULL,
    ADD COLUMN `name` VARCHAR(64) NOT NULL,
    ADD COLUMN `pictureName` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupMemberOneId` INTEGER NULL,
    `groupMemberTwoId` INTEGER NULL,
    `groupSize` INTEGER NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `cheese` BOOLEAN NOT NULL DEFAULT false,
    `ham` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Classroom` ADD CONSTRAINT `Classroom_reservedById_fkey` FOREIGN KEY (`reservedById`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classroom` ADD CONSTRAINT `Classroom_takenById_fkey` FOREIGN KEY (`takenById`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_dishId_fkey` FOREIGN KEY (`dishId`) REFERENCES `Dish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_groupMemberOneId_fkey` FOREIGN KEY (`groupMemberOneId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_groupMemberTwoId_fkey` FOREIGN KEY (`groupMemberTwoId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
