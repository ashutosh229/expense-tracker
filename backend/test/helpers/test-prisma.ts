import { PrismaClient } from '@prisma/client';

export const testPrisma = new PrismaClient();

export async function resetAuthTestData() {
  await testPrisma.user.deleteMany({
    where: {
      email: {
        endsWith: '@auth-e2e.test',
      },
    },
  });
}
