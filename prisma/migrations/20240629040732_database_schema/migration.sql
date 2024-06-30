/*
  Warnings:

  - The primary key for the `ServiceOnBranch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `serviceOnBranchId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_branchId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "serviceOnBranchId" INTEGER NOT NULL,
ALTER COLUMN "branchId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceOnBranch" DROP CONSTRAINT "ServiceOnBranch_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ServiceOnBranch_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_serviceOnBranchId_fkey" FOREIGN KEY ("serviceOnBranchId") REFERENCES "ServiceOnBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
