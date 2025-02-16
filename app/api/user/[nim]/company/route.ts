import CompanyRepository from "@/repositories/CompanyRepository";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { nim: string } }) {
    console.log("Get Company")
    const nim = params.nim;
    const companies = await getCompanies();
    const recommendedCompanies = await getUserRecommendedCompany(nim)
    const recommendedCompanyIds = recommendedCompanies.map(company => company.id) || [];
    const companiesWithStatus = await Promise.all(
        companies.map(async (company) => ({
            ...company,
            status: recommendedCompanyIds.includes(company.id) ? 'Recommended' : 'N/A',
        }))
    );
    return NextResponse.json(companiesWithStatus)
}
async function getUserRecommendedCompany(nim: string) {
    return await CompanyRepository.getRecommendedCompany(nim)
}
async function getCompanies() {
    return await CompanyRepository.getCompanies();
}