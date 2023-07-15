-- CreateTable
CREATE TABLE "tb_health_data" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" INTEGER NOT NULL,
    "meta_calorias" INTEGER NOT NULL,
    "meta_macros_id" INTEGER NOT NULL,

    CONSTRAINT "tb_health_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_meta_macros" (
    "id" SERIAL NOT NULL,
    "p" INTEGER NOT NULL,
    "c" INTEGER NOT NULL,
    "g" INTEGER NOT NULL,

    CONSTRAINT "tb_meta_macros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_health_data_userId_key" ON "tb_health_data"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_health_data_meta_macros_id_key" ON "tb_health_data"("meta_macros_id");

-- AddForeignKey
ALTER TABLE "tb_health_data" ADD CONSTRAINT "tb_health_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_health_data" ADD CONSTRAINT "tb_health_data_meta_macros_id_fkey" FOREIGN KEY ("meta_macros_id") REFERENCES "tb_meta_macros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
