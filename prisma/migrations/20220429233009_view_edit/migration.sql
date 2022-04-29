/*
  Warnings:

  - You are about to drop the column `Views` on the `tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "Views",
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
