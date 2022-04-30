/*
  Warnings:

  - Made the column `tb_workoutId` on table `tb_group` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tb_group" DROP CONSTRAINT "tb_group_tb_workoutId_fkey";

-- AlterTable
ALTER TABLE "tb_group" ALTER COLUMN "tb_workoutId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_group" ADD CONSTRAINT "tb_group_tb_workoutId_fkey" FOREIGN KEY ("tb_workoutId") REFERENCES "tb_workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
