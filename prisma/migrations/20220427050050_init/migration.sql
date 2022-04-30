-- CreateTable
CREATE TABLE "tb_workout" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tb_workout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_workout_userId_key" ON "tb_workout"("userId");

-- AddForeignKey
ALTER TABLE "tb_workout" ADD CONSTRAINT "tb_workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
