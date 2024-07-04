/*
  Warnings:

  - You are about to drop the column `orderId` on the `order_item` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Cart_Item_cartId_fkey` ON `cart_item`;

-- DropIndex
DROP INDEX `Cart_Item_foodId_fkey` ON `cart_item`;

-- DropIndex
DROP INDEX `Food_categoryId_fkey` ON `food`;

-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Order_item_foodId_fkey` ON `order_item`;

-- DropIndex
DROP INDEX `Order_item_orderId_fkey` ON `order_item`;

-- AlterTable
ALTER TABLE `order_item` DROP COLUMN `orderId`;
