/*
  Warnings:

  - Added the required column `date` to the `tb_refeicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_refeicao" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
