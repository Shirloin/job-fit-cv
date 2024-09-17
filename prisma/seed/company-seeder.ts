import fs from 'fs';
import prisma from '../prisma';
import csvParser from 'csv-parser';

interface CompanyData {
    companyName: string
    positionName: string
    programName: string
}

export async function seedCompany() {
    const filePath = 'data/List perusahaan.csv';

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const data: CompanyData[] = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            if (row.name !== "" && row.position !== "" && row.program !== "") {
                data.push({
                    companyName: row.name,
                    positionName: row.position,
                    programName: row.program
                });
            }
        })
        .on('end', async () => {
            for (const row of data) {
                const companyName = row.companyName;
                const positionName = row.positionName;
                const programName = row.programName;

                const program = await prisma.program.upsert({
                    where: { name: programName },
                    update: {},
                    create: { name: programName }
                })

                const position = await prisma.position.upsert({
                    where: { name: positionName },
                    update: {},
                    create: { name: positionName },
                });

                const company = await prisma.company.create({
                    data: {
                        name: companyName,
                        programId: program.id,
                        positionId: position.id
                    },
                });
            }
            console.log('Company, Position, and Program seeding completed');
        });
}
