/*
  Warnings:

  - A unique constraint covering the columns `[patent]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Made the column `patent` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "patent" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_patent_key" ON "Vehicle"("patent");
