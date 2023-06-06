/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "dni" TEXT NOT NULL DEFAULT 'dni';

-- CreateIndex
CREATE UNIQUE INDEX "Driver_dni_key" ON "Driver"("dni");
