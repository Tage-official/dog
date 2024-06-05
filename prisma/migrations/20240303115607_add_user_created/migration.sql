/*
  Warnings:

  - Added the required column `userCreatedId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `userCreatedId` VARCHAR(255) NOT NULL;
