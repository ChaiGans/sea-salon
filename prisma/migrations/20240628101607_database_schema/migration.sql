/*
  Warnings:

  - You are about to drop the column `minutes` on the `Service` table. All the data in the column will be lost.
  - Added the required column `minutes` to the `ServiceOnBranch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "minutes";

-- AlterTable
ALTER TABLE "ServiceOnBranch" ADD COLUMN     "minutes" INTEGER NOT NULL;
