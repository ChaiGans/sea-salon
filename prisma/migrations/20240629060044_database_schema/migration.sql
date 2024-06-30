/*
  Warnings:

  - You are about to drop the column `branchId` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_branchId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "branchId";
