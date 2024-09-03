import CompanyRepository from "@/repositories/CompanyRepository"
import ProgramRepository from "@/repositories/ProgramRepository"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest){
    const programs = await getAllPrograms()
    return NextResponse.json(programs)
}

export async function POST(req: NextRequest){
}

async function getAllPrograms(){
    return await ProgramRepository.getAllPrograms()
}