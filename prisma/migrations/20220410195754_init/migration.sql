-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "gameDescription" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
