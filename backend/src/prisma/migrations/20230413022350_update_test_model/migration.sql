/*
  Warnings:

  - Added the required column `test_type` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "test_type" VARCHAR(25) NOT NULL;
