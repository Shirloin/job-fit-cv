import prisma from "@/prisma/prisma";
const SCHEMA = prisma.position

export default class PositionRepository{
    static getAllPosition = async() => {
        const positions = await SCHEMA.findMany({})
        return positions.map(position => position.name);
    }

    static getPositionByName = async (name: string) =>{
        const position = await SCHEMA.findFirst({
            where: {
                name: name
            }
        })
        return position
    }

    static insertPosition = async(name: string) => {
        const position = await SCHEMA.create({
            data: {
                name: name
            }
        })
        return position
    }
}