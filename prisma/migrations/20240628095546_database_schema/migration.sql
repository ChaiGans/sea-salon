/*
  Warnings:

  - You are about to drop the column `service` on the `Branch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "service";

-- DropEnum
DROP TYPE "Service";

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "branchId" INTEGER,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_service_name_key" ON "Service"("service_name");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
