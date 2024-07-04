-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cart_item` DROP FOREIGN KEY `Cart_Item_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cart_item` DROP FOREIGN KEY `Cart_Item_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `Order_item_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `Order_item_orderId_fkey`;
