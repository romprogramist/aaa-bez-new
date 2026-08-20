-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "comments" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "emailed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "applications_createdAt_idx" ON "applications"("createdAt");

-- CreateIndex
CREATE INDEX "applications_phone_idx" ON "applications"("phone");
