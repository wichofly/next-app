-- AlterTable
ALTER TABLE "User" ADD COLUMN "username" TEXT;

-- Backfill existing rows
UPDATE "User"
SET "username" = split_part("email", '@', 1)
WHERE "username" IS NULL;

-- Enforce required column
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
