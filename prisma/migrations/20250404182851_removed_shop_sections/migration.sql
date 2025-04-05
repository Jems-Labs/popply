/*
  Warnings:

  - You are about to drop the `ProductSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductSection" DROP CONSTRAINT "ProductSection_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSection" DROP CONSTRAINT "ProductSection_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "ShopSection" DROP CONSTRAINT "ShopSection_shopId_fkey";

-- DropTable
DROP TABLE "ProductSection";

-- DropTable
DROP TABLE "ShopSection";
