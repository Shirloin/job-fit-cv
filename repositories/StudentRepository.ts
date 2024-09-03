import prisma from "@/prisma/prisma";

const SCHEMA = prisma.user;

export default class StudentRepository {
  static updateStudent = async (id: string, username: string, name: string, email: string, program: string) => {
    return await SCHEMA.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        name: name,
        email: email,
        program: {
          connectOrCreate: {
            where: {
              name: program
            },
            create: {
              name: program
            }
          }
        }
      }
    })
  }
  static deleteStudent = async (id: string) => {
    return await SCHEMA.delete({
      where: {
        id: id,
      },
    });
  };


}
