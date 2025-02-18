import prisma from './prisma';
import { seedUser } from './seed/user-seeder';
import { seedSemester } from './seed/semester-seeder';
import { seedCompany } from './seed/company-seeder';
import { seedStudentScore } from './seed/student-score';
import { seedProgram } from './seed/program-seeder';

async function main() {
  await refresh();
  await seedProgram();
  // await seedCompany()
  await seedUser();
  await seedSemester();
  await seedStudentScore();
}

async function refresh() {
  await prisma.studentSubjectScore.deleteMany();
  await prisma.user.deleteMany();
  await prisma.semester.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.company.deleteMany();
  await prisma.position.deleteMany();
  await prisma.program.deleteMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
