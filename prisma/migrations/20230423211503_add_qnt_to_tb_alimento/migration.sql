/*
  Warnings:

  - Added the required column `qnt` to the `tb_alimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_alimento" ADD COLUMN     "qnt" DECIMAL(65,30) NOT NULL;
