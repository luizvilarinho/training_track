-- DropForeignKey
ALTER TABLE "tb_group" DROP CONSTRAINT "tb_group_tb_workoutId_fkey";

-- AlterTable
ALTER TABLE "tb_group" ALTER COLUMN "tb_workoutId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_group" ADD CONSTRAINT "tb_group_tb_workoutId_fkey" FOREIGN KEY ("tb_workoutId") REFERENCES "tb_workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
