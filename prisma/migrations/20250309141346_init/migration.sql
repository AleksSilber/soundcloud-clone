/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrackGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrackPlay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TrackGenre` DROP FOREIGN KEY `TrackGenre_trackId_fkey`;

-- DropForeignKey
ALTER TABLE `TrackPlay` DROP FOREIGN KEY `TrackPlay_trackId_fkey`;

-- DropForeignKey
ALTER TABLE `TrackPlay` DROP FOREIGN KEY `TrackPlay_userId_fkey`;

-- DropTable
DROP TABLE `Notification`;

-- DropTable
DROP TABLE `TrackGenre`;

-- DropTable
DROP TABLE `TrackPlay`;
