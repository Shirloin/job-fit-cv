import CompanyRepository from "@/repositories/CompanyRepository";
import PositionRepository from "@/repositories/PositionRepository";
import ProgramRepository from "@/repositories/ProgramRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const companies = await getCompanies();
  return NextResponse.json(companies);
}

export async function POST(req: NextRequest) {
  const { name, positionName, programName } = await req.json();
  let position = await getPosition(positionName);

  if (!position) {
    position = await insertPosition(positionName);
  }

  const program = await getProgramByName(programName);
  if (!program) {
    return NextResponse.json({ message: "Program name not found" });
  }

  const company = await insertCompany(name, position.id, program?.id);

  return NextResponse.json(company);
}

async function getCompanies() {
  return await CompanyRepository.getCompanies();
}

async function insertCompany(
  name: string,
  positionId: string,
  programId: string
) {
  return await CompanyRepository.insertCompany(name, positionId, programId);
}

async function getPosition(name: string) {
  return await PositionRepository.getPositionByName(name);
}

async function insertPosition(name: string) {
  return await PositionRepository.insertPosition(name);
}

async function getProgramByName(name: string) {
  return ProgramRepository.getProgramByName(name);
}

async function getCompanyByName(name: string) {
  return CompanyRepository.getCompanyByName(name);
}
