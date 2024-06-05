/*
  Warnings:

  - Added the required column `address` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `address` VARCHAR(255) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(255) NOT NULL;
