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
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
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
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  });
}
