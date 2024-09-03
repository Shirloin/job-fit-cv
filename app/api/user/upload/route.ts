import ProgramRepository from "@/repositories/ProgramRepository";
import UserRepository from "@/repositories/UserRepository";
import csvParser from "csv-parser";
import { NextRequest, NextResponse } from "next/server";
import readXlsxFile from "read-excel-file";
import { Readable } from "stream";
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
        console.log(data[0])
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

        const accounts = []

        for (const row of rows) {

            const nim = row["STUDENT ID"]
            const name = row["STUDENT NAME"]
            const program = row["ACADEMIC PROGRAM"]
            const email = row["STUDENT EMAIL"]
            try {
                const account = await createAccount(nim, name, program, email)
                accounts.push(account)
            } catch (error) {
                continue
            }
        }
        return NextResponse.json({ msg: "Account Success Inserted", accounts: accounts });
    } catch (error) {
        console.error("Error processing file:", error);
        return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
    }
}

async function createAccount(nim: string, name: string, programName: string, email: string) {
    const program = await getProgram(programName)
    return await UserRepository.createAccount(nim, name, "student", email, program?.id)
}

async function getProgram(program: string) {
    return await ProgramRepository.getProgramByName(program)
}