-- CreateTable
CREATE TABLE "tb_tipo_refeicao" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "tb_tipo_refeicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_alimento" (
    "id" SERIAL NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cal" INTEGER NOT NULL,
    "p" INTEGER NOT NULL,
    "c" INTEGER NOT NULL,
    "g" INTEGER NOT NULL,
    "f" INTEGER NOT NULL,
    "tb_refeicaoId" INTEGER,

    CONSTRAINT "tb_alimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_refeicao" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tb_refeicao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_alimento" ADD CONSTRAINT "tb_alimento_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "tb_tipo_refeicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_alimento" ADD CONSTRAINT "tb_alimento_tb_refeicaoId_fkey" FOREIGN KEY ("tb_refeicaoId") REFERENCES "tb_refeicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_refeicao" ADD CONSTRAINT "tb_refeicao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
