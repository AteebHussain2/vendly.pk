/*
  Warnings:

  - You are about to drop the column `tier_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tier_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tier_id",
ADD COLUMN     "tierId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "SubscriptionTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
