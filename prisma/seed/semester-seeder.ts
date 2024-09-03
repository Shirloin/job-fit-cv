
import prisma from '../prisma';
export async function seedSemester(){

    await prisma.semester.createMany({
        data: [
            {
                name: "Even",
                startDate: new Date('2025-01-01'),
                endDate: new Date('2025-06-31'),
            },
            {
                name: "Odd",
                startDate: new Date('2024-07-01'),
                endDate: new Date('2024-12-31'),
            },
            {
                name: "Even",
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-06-31'),
            },
            {
                name: "Odd",
                startDate: new Date('2023-07-01'),
                endDate: new Date('2023-12-31'),
            },
            {
                name: "Even",
                startDate: new Date('2023-01-01'),
                endDate: new Date('2023-06-31'),
            },
            {
                name: "Odd",
                startDate: new Date('2022-07-01'),
                endDate: new Date('2022-12-31'),
            },
            {
                name: "Even",
                startDate: new Date('2022-01-01'),
                endDate: new Date('2022-06-31'),
            },
            {
                name: "Odd",
                startDate: new Date('2021-07-01'),
                endDate: new Date('2021-12-31'),
            },
        ],
        skipDuplicates: true,
    })
}