/*
  Warnings:

  - Added the required column `price` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Request` ADD COLUMN `price` DECIMAL(10, 2) NOT NULL;
