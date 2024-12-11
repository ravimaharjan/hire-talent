/*
  Warnings:

  - Added the required column `subscription_id` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Freelancer', 'Employer');

-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "subscription_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "UserType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
