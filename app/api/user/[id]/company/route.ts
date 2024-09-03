import CompanyRepository from "@/repositories/CompanyRepository";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const companies = await getCompanies();
    const recommendedCompanies = await getUserRecommendedCompany(id)
    const recommendedCompanyIds = recommendedCompanies.map(company => company.id) || [];

    const companiesWithStatus = companies.map(company => ({
        ...company,
        status: recommendedCompanyIds.includes(company.id) ? 'Recommended' : '-',
    }));
    return NextResponse.json(companiesWithStatus)
}
async function getUserRecommendedCompany(id: string) {
    return await CompanyRepository.getRecommendedCompany(id)
}
async function getCompanies() {
    return await CompanyRepository.getCompanies();
}