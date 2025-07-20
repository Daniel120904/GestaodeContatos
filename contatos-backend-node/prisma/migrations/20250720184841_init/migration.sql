-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
