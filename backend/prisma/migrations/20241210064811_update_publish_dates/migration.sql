-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aboutMe" TEXT,
ADD COLUMN     "bio" TEXT;
import { DateTime} from "@prisma/client/runtime";
export async function up(prisma) {
  await prisma.$executeRaw`UPDATE YourModel SET publishDate = NOW()`;
}

export async function down(prisma) {
  // No-op
}