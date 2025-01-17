-- AlterTable
ALTER TABLE "users" ADD COLUMN     "usedLangs" TEXT[] DEFAULT ARRAY[]::TEXT[];
