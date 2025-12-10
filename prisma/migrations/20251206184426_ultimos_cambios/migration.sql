/*
  Warnings:

  - You are about to drop the column `tipo` on the `Queja` table. All the data in the column will be lost.
  - You are about to drop the `Felcitacion` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[hcCode]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `area_medica` to the `Queja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area_medica` to the `Solicitud` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Felcitacion" DROP CONSTRAINT "Felcitacion_id_persona_fkey";

-- DropForeignKey
ALTER TABLE "Persona" DROP CONSTRAINT "Persona_id_usuario_fkey";

-- AlterTable
ALTER TABLE "Persona" ALTER COLUMN "insurance" DROP NOT NULL,
ALTER COLUMN "business" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "area" DROP NOT NULL,
ALTER COLUMN "id_usuario" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Queja" DROP COLUMN "tipo",
ADD COLUMN     "area_medica" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Solicitud" ADD COLUMN     "area_medica" TEXT NOT NULL;

-- DropTable
DROP TABLE "Felcitacion";

-- CreateTable
CREATE TABLE "Felicitacion" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "area_medica" TEXT NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Felicitacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_hcCode_key" ON "Persona"("hcCode");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Felicitacion" ADD CONSTRAINT "Felicitacion_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
