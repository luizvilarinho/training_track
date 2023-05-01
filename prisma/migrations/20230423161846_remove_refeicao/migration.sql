/*
  Warnings:

  - You are about to drop the column `tb_refeicaoId` on the `tb_alimento` table. All the data in the column will be lost.
  - You are about to drop the `tb_refeicao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `tb_alimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tb_alimento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_alimento" DROP CONSTRAINT "tb_alimento_tb_refeicaoId_fkey";

-- DropForeignKey
ALTER TABLE "tb_refeicao" DROP CONSTRAINT "tb_refeicao_userId_fkey";

-- AlterTable
ALTER TABLE "tb_alimento" DROP COLUMN "tb_refeicaoId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tb_refeicao";

-- AddForeignKey
ALTER TABLE "tb_alimento" ADD CONSTRAINT "tb_alimento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
