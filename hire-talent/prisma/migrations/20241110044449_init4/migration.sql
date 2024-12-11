/*
  Warnings:

  - You are about to drop the `FreeLancer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FreeLancer" DROP CONSTRAINT "FreeLancer_user_id_fkey";

-- DropTable
DROP TABLE "FreeLancer";

-- CreateTable
CREATE TABLE "FreeLancerProfile" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "currentCompany" TEXT NOT NULL,
    "currentSalary" DOUBLE PRECISION NOT NULL,
    "looking_for" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "FreeLancerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "freelancer_id" TEXT NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FreeLancerProfile_user_id_key" ON "FreeLancerProfile"("user_id");

-- AddForeignKey
ALTER TABLE "FreeLancerProfile" ADD CONSTRAINT "FreeLancerProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "FreeLancerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
