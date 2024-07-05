/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `category` table. All the data in the column will be lost.
  - The primary key for the `food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `food` table. All the data in the column will be lost.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `url` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Cart_userId_key` ON `cart`;

-- AlterTable
ALTER TABLE `cart` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `cart_item` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `cartId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    DROP COLUMN `image`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `food` DROP PRIMARY KEY,
    DROP COLUMN `image`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
