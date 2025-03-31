/*
  Warnings:

  - A unique constraint covering the columns `[uniqueUrl]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shop_uniqueUrl_key" ON "Shop"("uniqueUrl");
