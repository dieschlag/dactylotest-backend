-- CreateTable
CREATE TABLE "Performance" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "text_id" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "paragraph" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
