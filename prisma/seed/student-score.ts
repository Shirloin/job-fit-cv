import fs from 'fs';
import prisma from '../prisma';
import csvParser from 'csv-parser'
import { faker } from '@faker-js/faker'

export async function seedStudentScore() {
    const filePath = process.env.APP_ENV === "production" ? "../../data/student.csv" : 'data/student.csv';

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', async (row) => {
            if (row.semester_name === "" || row.semester_start_date === "" || row.semester_end_date === "" || row.nim === "" || row.subject_name === "" || row.subject_type === "" || row.score === "") {
                return;
            }
            const semesterName = row.semester_name;
            const semesterStartDate = row.semester_start_date;
            const semesterEndDate = row.semester_end_date;
            const nim = row.nim;
            const subjectName = row.subject_name;
            const subjectType = row.subject_type;
            const score = row.score;

            let semester = await prisma.semester.findFirst({
                where: {
                    name: semesterName,
                    startDate: new Date(semesterStartDate),
                    endDate: new Date(semesterEndDate)
                }
            })
            if (!semester) {
                semester = await prisma.semester.create({
                    data: {
                        name: semesterName,
                        startDate: new Date(semesterStartDate),
                        endDate: new Date(semesterEndDate)
                    }
                })
            }
            const user = await prisma.user.findUnique({
                where: { nim: nim }
            });

            if (!user) {
                console.error(`Student not found: ${nim}`);
                return
            }
            const subject = await prisma.subject.upsert({
                where: {
                    name: subjectName
                },
                update: {},
                create: {
                    name: subjectName,
                    type: subjectType
                }
            })

            const studentSubjectScore = await prisma.studentSubjectScore.create({
                data: {
                    score: parseFloat(score),
                    student: {
                        connect: {
                            id: user.id
                        }
                    },
                    subject: {
                        connect: {
                            id: subject.id
                        }
                    },
                    semester: {
                        connect: {
                            id: semester.id
                        }
                    }
                }
            })

        })
        .on('end', async () => {
            console.log('Student Score seeding completed');
        });

}