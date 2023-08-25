/*
  Warnings:

  - You are about to drop the column `groupId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[managedById]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reservedById]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[takenById]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupMemberOneId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupMemberTwoId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Made the column `groupMemberOneId` on table `group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupMemberTwoId` on table `group` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_groupMemberOneId_fkey`;

-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `Group_groupMemberTwoId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_groupId_fkey`;

-- AlterTable
ALTER TABLE `classroom` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `group` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `groupMemberOneId` INTEGER NOT NULL,
    MODIFY `groupMemberTwoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `openday` MODIFY `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `order` MODIFY `comment` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `groupId`,
    MODIFY `name` VARCHAR(64) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Classroom_managedById_key` ON `Classroom`(`managedById`);

-- CreateIndex
CREATE UNIQUE INDEX `Classroom_reservedById_key` ON `Classroom`(`reservedById`);

-- CreateIndex
CREATE UNIQUE INDEX `Classroom_takenById_key` ON `Classroom`(`takenById`);

-- CreateIndex
CREATE UNIQUE INDEX `Group_groupMemberOneId_key` ON `Group`(`groupMemberOneId`);

-- CreateIndex
CREATE UNIQUE INDEX `Group_groupMemberTwoId_key` ON `Group`(`groupMemberTwoId`);

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_groupMemberOneId_fkey` FOREIGN KEY (`groupMemberOneId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_groupMemberTwoId_fkey` FOREIGN KEY (`groupMemberTwoId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
