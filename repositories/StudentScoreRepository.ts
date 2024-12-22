import prisma from "@/prisma/prisma";

const SCHEMA = prisma.studentSubjectScore;

export default class StudentScoreRepository {
    static getStudentScorePerSemester = async (
        username: string,
        semesterName: string,
        startDate: Date,
        endDate: Date
    ) => {
        return SCHEMA.findMany({
            where: {
                student: {
                    username: username,
                },
                semester: {
                    name: semesterName,
                    startDate: startDate,
                    endDate: endDate,
                },
            },
            include: {
                subject: true,
            },
        });
    };

    static getStudentScore = async (id: string) => {
        const scores = await SCHEMA.findMany({
            where: {
                student: {
                    id: id
                }
            },
            include: {
                semester: true,
                subject: true,
            },
            orderBy: {
                semester: {
                    startDate: "asc"
                }
            }
        })
        return scores;
    }
}
