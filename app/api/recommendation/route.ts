import CompanyRepository from "@/repositories/CompanyRepository";
import UserRepository from "@/repositories/UserRepository";
import { TCompany } from "@/types/company";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { skills, projectDescription, experienceDescription, userId } =
    await req.json();
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_JOB_RECOMMENDER_PATH}/get-recommendation`,
    {
      skills,
      projectDesc: projectDescription,
      experiences: experienceDescription,
    }
  );

  const data = response.data;
  const recommendedCompany = data.slice(0, 5).map((e: any) => e.Company);
  const companies = await Promise.all(
    recommendedCompany.map(async (name: string) => {
      let company = getCompanyByName(name);
      if (company) {
        return company;
      }
      return null;
    })
  );
  const validCompanies = companies.filter((company) => company != null);
  const user = await setUserRecommendedCompany(userId, validCompanies);
  console.log(user);
  return NextResponse.json({ user });
}

async function getCompanyByName(name: string) {
  return await CompanyRepository.getCompanyByName(name);
}

async function setUserRecommendedCompany(
  userId: string,
  companies: TCompany[]
) {
  return await UserRepository.setUserRecommendedCompany(userId, companies);
}
