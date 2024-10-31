import prisma from '../prisma';

export async function seedProgram() {
    await prisma.program.createMany({
        data: [
            { name: "Computer Science" },
            { name: "Mobile Application and Technology" },
            { name: "Data Science" },
            { name: "Cyber Security" },
            { name: "Game Application and Technology" },
            { name: "Computer Science & Mathematics" },
            { name: "Computer Science & Statistics" },
        ]
    })

}