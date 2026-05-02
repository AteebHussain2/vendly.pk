-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tier_id" TEXT;

-- CreateTable
CREATE TABLE "SubscriptionTier" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "base_store_limit" INTEGER NOT NULL DEFAULT 1,
    "base_team_member_limit" INTEGER NOT NULL DEFAULT 0,
    "base_product_limit" INTEGER NOT NULL DEFAULT 50,
    "base_ai_daily_limit" INTEGER NOT NULL DEFAULT 100,
    "features" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionTier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionTier_slug_key" ON "SubscriptionTier"("slug");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "SubscriptionTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
