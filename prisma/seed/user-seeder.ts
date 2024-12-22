import bcrypt from "bcryptjs";
import prisma from "../prisma";

export async function seedUser() {
  await prisma.user.create({
    data: {
      username: "2502017572",
      password: await bcrypt.hash("cx", 10),
      role: "student",
      name: "Riccardo",
      email: "riccardo@binus.ac.id",
      campus: "Kemanggisan",
      program: {
        connectOrCreate: {
          where: {
            name: "Mobile Application and Technology",
          },
          create: {
            // academicCode: "KBMAT",
            name: "Mobile Application and Technology",
          },
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "cx",
      username: "cx",
      password: await bcrypt.hash("cx", 10),
      role: "admin",
    },
  });
}
