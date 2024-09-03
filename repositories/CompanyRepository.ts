import prisma from "@/prisma/prisma";

const SCHEMA = prisma.company;

export default class CompanyRepository {
  static getCompanies = async () => {
    return SCHEMA.findMany({
      include: {
        program: true,
        position: true,
      },
    });
  };

  static getCompanyById = async (id: string) => {
    return SCHEMA.findUnique({
      where: {
        id: id,
      },
      include: {
        program: true,
        position: true,
      },
    });
  };

  static getCompanyByName = async (name: string) => {
    return SCHEMA.findFirst({
      where: {
        name: name,
      },
      include: {
        program: true,
        position: true,
      },
    });
  };
  static getCompanyByNameOrIndustry = async (key: string) => {
    return SCHEMA.findMany({
      where: {
        OR: [{ name: { contains: key, mode: "insensitive" } }],
      },
    });
  };

  static getRecommendedCompany = async (userId: string) => {
    return SCHEMA.findMany({
      where: {
        recomendedToUsers: {
          some: {
            id: userId
          }
        }
      },
      include: {
        position: true,
        program: true
      }
    })
  }

  static insertCompany = async (
    name: string,
    positionId: string,
    programId: string
  ) => {
    return await SCHEMA.create({
      data: {
        name: name,
        position: {
          connect: {
            id: positionId,
          },
        },
        program: {
          connect: {
            id: programId,
          },
        },
      },
      include: {
        position: true,
        program: true,
      },
    });
  };

  static updateCompany = async (
    id: string,
    name: string,
    position: string,
    program: string
  ) => {
    return await SCHEMA.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        position: {
          connectOrCreate: {
            where: {
              name: position,
            },
            create: {
              name: position,
            },
          },
        },
        program: {
          connectOrCreate: {
            where: {
              name: program,
            },
            create: {
              name: program,
            },
          },
        },
      },
    });
  };

  static deleteCompany = async (id: string) => {
    return await SCHEMA.delete({
      where: {
        id: id,
      },
    });
  };
}
