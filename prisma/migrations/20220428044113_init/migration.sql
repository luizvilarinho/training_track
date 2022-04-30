/*
  Warnings:

  - You are about to drop the column `group_type` on the `tb_group` table. All the data in the column will be lost.
  - Added the required column `type` to the `tb_group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_group" DROP CONSTRAINT "tb_group_group_type_fkey";

-- AlterTable
ALTER TABLE "tb_group" DROP COLUMN "group_type",
ADD COLUMN     "type" INTEGER NOT NULL;
