-- CreateEnum
CREATE TYPE "ShopStatus" AS ENUM ('draft', 'open', 'expired');

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "launchDate" TIMESTAMP(3),
ADD COLUMN     "status" "ShopStatus" NOT NULL DEFAULT 'draft';
