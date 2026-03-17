/*
  Warnings:

  - A unique constraint covering the columns `[policyNumber]` on the table `Claim` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `driverName` to the `Claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyNumber` to the `Claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "driverName" TEXT NOT NULL,
ADD COLUMN     "estimatedAmount" DOUBLE PRECISION,
ADD COLUMN     "policyNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Claim_policyNumber_key" ON "Claim"("policyNumber");
