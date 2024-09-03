import prisma from "@/prisma/prisma";
const SCHEMA = prisma.program

export default class ProgramRepository{
    static getAllPrograms = async() => {
        return SCHEMA.findMany({})
    }

    static getProgramByName = async(name: string) => {
        return SCHEMA.findUnique({
            where: {
                name: name
            }
        })
    }
}