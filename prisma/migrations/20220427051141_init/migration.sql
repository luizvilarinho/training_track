/*
  Warnings:

  - You are about to drop the column `description` on the `tb_workout` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `tb_workout` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `tb_workout` table. All the data in the column will be lost.
  - Added the required column `date` to the `tb_workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastTraining` to the `tb_workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_workout" DROP COLUMN "description",
DROP COLUMN "sets",
DROP COLUMN "type",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastTraining" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "tb_group" (
    "id" SERIAL NOT NULL,
    "group_type" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "tb_workoutId" INTEGER NOT NULL,

    CONSTRAINT "tb_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_group_type" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "tb_group_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_group" ADD CONSTRAINT "tb_group_tb_workoutId_fkey" FOREIGN KEY ("tb_workoutId") REFERENCES "tb_workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_group" ADD CONSTRAINT "tb_group_group_type_fkey" FOREIGN KEY ("group_type") REFERENCES "tb_group_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
