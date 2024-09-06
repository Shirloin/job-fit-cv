import prisma from "@/prisma/prisma";
import { TCompany } from "@/types/company";
import bcrypt from "bcryptjs"
import { JsonArray, JsonObject } from "@prisma/client/runtime/library";

const SCHEMA = prisma?.user;

export default class UserRepository {
  static async createAccount(
    username: string,
    name: string,
    role: string,
    email?: string,
    programId?: string,
    campus?: string,
  ) {
    return await SCHEMA.create({
      data: {
        username: username,
        password: await bcrypt.hash(username, 10),
        name: name,
        nim: username,
        email: email,
        role: role,
        program: {
          connect: {
            id: programId,
          },
        },
        campus: campus
      },
    });
  }

  static async getAllStudent() {
    return await SCHEMA.findMany({
      where: {
        role: {
          contains: "student",
          mode: "insensitive"
        }
      },
      include: {
        program: true,
      },
    });
  }
  static async getUserByUsername(username: string) {
    return await SCHEMA.findUnique({
      where: {
        username: username,
      },
    });
  }
  static async getUserById(id: string) {
    return await SCHEMA.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async saveCV(id: string, json: JsonObject) {
    return await SCHEMA.update({
      where: {
        id: id,
      },
      data: {
        cv: json,
      },
    });
  }

  static async getCV(nim: string) {
    return await SCHEMA.findUnique({
      where: {
        nim: nim,
      },
      select: {
        cv: true,
      },
    });
  }

  static async changePassword(id: string, newPassword: string) {
    return await SCHEMA.update({
      where: {
        id: id,
      },
      data: {
        password: newPassword,
      },
    });
  }

  static async setUserRecommendedCompany(id: string, companies: TCompany[]) {
    const companyConnections = companies.map((company) => ({ id: company.id }));
    return await SCHEMA.update({
      where: { id: id },
      data: {
        recommendedCompanies: {
          set: companyConnections,
        },
      },
    });
  }

  static async getUserByEmail(email?: string) {
    return await SCHEMA.findFirst({
      where:
        { email: email }
    })
  }

  static async getUserRecommendedCompany(nim: string) {
    return await SCHEMA.findFirst({
      where: {
        nim: nim
      },
      select: {
        recommendedCompanies: {
          include: {
            position: true,
            program: true
          }
        },
      },
    })
  }


}
