import CompanyRepository from "@/repositories/CompanyRepository";
import PositionRepository from "@/repositories/PositionRepository";
import ProgramRepository from "@/repositories/ProgramRepository";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from 'xlsx';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");

        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]];
        const data: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (data.length === 0) {
            return NextResponse.json({ error: "No data found in the file" }, { status: 400 });
        }
        const headers = data[0];
        const rows = data.slice(1).map((row: string[]) => {
            const obj: { [key: string]: string } = {};
            row.forEach((cell, index) => {

                obj[headers[index]] = cell;
            });
            return obj;
        });

        const companies = []

        for (const row of rows) {

            const comapanyName = row["Name"]
            const positionName = row["Position"]
            const programName = row["Program"]
            try {
                const company = await insertCompany(comapanyName, programName, positionName)
                companies.push(company)
            } catch (error) {
                continue
            }
        }

        return NextResponse.json({ msg: "Companies Success Inserted", companies: companies });
    } catch (error) {
        console.error("Error processing file:", error);
        return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
    }
}

async function insertCompany(name: string, programName: string, positionName: string) {
    const program = await getProgram(programName)
    const position = await getPosition(positionName)
    return await CompanyRepository.insertCompany(name, position!.id, program!.id)
}

async function getProgram(program: string) {
    return await ProgramRepository.getProgramByName(program)
}

async function getPosition(position: string) {
    return await PositionRepository.getPositionByName(position)
}