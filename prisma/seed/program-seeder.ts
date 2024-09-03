import fs from 'fs';
import prisma from '../prisma';
import csvParser from 'csv-parser'
import { faker } from '@faker-js/faker'

export async function seedProgram() {
    const filePath = 'data/program.csv';

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', async (row) => {
            if (row.code === "" || row.name === "") {
                return
            }
            const code = row.code
            const name = row.name


        })
        .on('end', async () => {
            console.log('Program seeding completed');
        });

}