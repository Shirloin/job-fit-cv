import CompanyRepository from "@/repositories/CompanyRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const company = await getCompany(id);
    return NextResponse.json(company, {
        status: 200
    });
}

async function getCompany(id: string) {
    return await CompanyRepository.getCompanyById(id)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }){
    const id = params.id
    const {name, positionName, programName} = await req.json()

    const company = await updateCompany(id, name, positionName, programName)
    return NextResponse.json({company})

}

async function updateCompany(id: string, name: string, position: string, program: string){
    return await CompanyRepository.updateCompany(id, name, position, program)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
    const id = params.id;
    const company = await deleteCompany(id);
    return NextResponse.json(company, {
        status: 200
    });
}

async function deleteCompany(id: string){
    return await CompanyRepository.deleteCompany(id)
}