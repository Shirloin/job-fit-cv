import CompanyRepository from "@/repositories/CompanyRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { nim: string } }) {
    const { nim } = params
    const recommendedCompanies = await getUserRecommendedCompany(nim)
    return NextResponse.json(recommendedCompanies)
}

async function getUserRecommendedCompany(nim: string) {
    return await CompanyRepository.getRecommendedCompany(nim)
}