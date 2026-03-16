-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "vehicle" TEXT NOT NULL,
    "description" TEXT,
    "expertId" INTEGER NOT NULL,
    "createdt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expert" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Claim_reference_key" ON "Claim"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Expert_email_key" ON "Expert"("email");

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "Expert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
