import CompanyRepository from "@/repositories/CompanyRepository";
import UserRepository from "@/repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const cv = await getCV(id);
    return NextResponse.json(cv, {
        status: 200
    });
}

async function getCV(id: string) {
    return await UserRepository.getCV(id)
}