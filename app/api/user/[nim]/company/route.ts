import CompanyRepository from "@/repositories/CompanyRepository";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { nim: string } }) {
    const nim = params.nim;
    const companies = await getCompanies();
    const recommendedCompanies = await getUserRecommendedCompany(nim)
    const recommendedCompanyIds = recommendedCompanies.map(company => company.id) || [];

    const companiesWithStatus = companies.map(company => ({
        ...company,
        status: recommendedCompanyIds.includes(company.id) ? 'Recommended' : '-',
    }));
    return NextResponse.json(companiesWithStatus)
}
async function getUserRecommendedCompany(nim: string) {
    return await CompanyRepository.getRecommendedCompany(nim)
}
async function getCompanies() {
    return await CompanyRepository.getCompanies();
}