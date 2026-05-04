DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'OrderStatus' AND e.enumlabel = 'NEW'
  ) THEN
    ALTER TYPE "public"."OrderStatus" ADD VALUE 'NEW';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'OrderStatus' AND e.enumlabel = 'PROCESSING'
  ) THEN
    ALTER TYPE "public"."OrderStatus" ADD VALUE 'PROCESSING';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'OrderStatus' AND e.enumlabel = 'COMPLETED'
  ) THEN
    ALTER TYPE "public"."OrderStatus" ADD VALUE 'COMPLETED';
  END IF;
END $$;

ALTER TABLE "public"."Category"
  ADD COLUMN IF NOT EXISTS "sortOrder" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "public"."Order"
  ADD COLUMN IF NOT EXISTS "adminComment" TEXT;

ALTER TABLE "public"."User"
  ADD COLUMN IF NOT EXISTS "isBlocked" BOOLEAN NOT NULL DEFAULT false;
