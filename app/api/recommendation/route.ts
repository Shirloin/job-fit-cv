import CompanyRepository from '@/repositories/CompanyRepository';
import UserRepository from '@/repositories/UserRepository';
import { TCompany } from '@/types/company';
import { JsonObject } from '@prisma/client/runtime/library';
import axios from 'axios';
import { log } from 'console';
import { NextRequest, NextResponse } from 'next/server';

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

  const companies = await Promise.all(
    data.map(async (d: { Company: string; Position: string }) => {
      let company = await getCompanyByPosition(d.Company, d.Position);
      if (company) {
        return company;
      }
      return null;
    })
  );

  // const companies = await Promise.all(
  //   recommendedCompany.map(async (position: string) => {
  //     let company = await getCompanyByPosition(name, position);
  //     console.log(position);
  //     console.log(company);
  //     if (company) {
  //       return company;
  //     }
  //     return null;
  //   })
  // );

  console.log('rrrr', companies);

  const validCompanies = companies.filter((company: any) => company != null);
  const user = await setUserRecommendedCompany(userId, validCompanies);
  return NextResponse.json({ user });
}

async function getCompanyByPosition(name: string, position: string) {
  return await CompanyRepository.getCompanyByPosition(name, position);
}

async function setUserRecommendedCompany(
  userId: string,
  companies: TCompany[]
) {
  return await UserRepository.setUserRecommendedCompany(userId, companies);
}
