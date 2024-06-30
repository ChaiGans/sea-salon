/*
  Warnings:

  - You are about to drop the column `service` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `service` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "service" "Service" NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "service";
