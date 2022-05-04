-- DropForeignKey
ALTER TABLE "tb_group" DROP CONSTRAINT "tb_group_tb_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "tb_workout" DROP CONSTRAINT "tb_workout_userId_fkey";

-- AddForeignKey
ALTER TABLE "tb_workout" ADD CONSTRAINT "tb_workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_group" ADD CONSTRAINT "tb_group_tb_workoutId_fkey" FOREIGN KEY ("tb_workoutId") REFERENCES "tb_workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
