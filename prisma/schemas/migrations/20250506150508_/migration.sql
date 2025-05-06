/*
  Warnings:

  - You are about to drop the column `text_id` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `quote_id` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wpm` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_text_id_fkey";

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "text_id",
DROP COLUMN "time",
ADD COLUMN     "quote_id" INTEGER NOT NULL,
ADD COLUMN     "wpm" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
