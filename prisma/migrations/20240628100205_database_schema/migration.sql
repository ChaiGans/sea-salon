/*
  Warnings:

  - You are about to drop the column `branchId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_branchId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "branchId";

-- CreateTable
CREATE TABLE "ServiceOnBranch" (
    "branchId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "ServiceOnBranch_pkey" PRIMARY KEY ("branchId","serviceId")
);

-- AddForeignKey
ALTER TABLE "ServiceOnBranch" ADD CONSTRAINT "ServiceOnBranch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOnBranch" ADD CONSTRAINT "ServiceOnBranch_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
