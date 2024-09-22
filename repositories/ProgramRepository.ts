import prisma from "@/prisma/prisma";
const SCHEMA = prisma.program

export default class ProgramRepository {
    static getAllPrograms = async () => {
        return SCHEMA.findMany({})
    }

    static getProgramByName = async (name: string) => {
        const program = await SCHEMA.upsert({
            where: {
                name: name
            },
            update: {},
            create: {
                name: name,
            }
        })
        return program
    }
}