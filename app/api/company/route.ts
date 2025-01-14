import { sendErrorResponse, validateField } from "@/lib/helper";
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
  try {
    validateField(name, "Company name is required");
    validateField(positionName, "Position name is required");
    validateField(programName, "Program name is required");

    let position = await getPosition(positionName);
    if (!position) {
      position = await insertPosition(positionName);
    }

    const program = await getProgramByName(programName);
    if (!program) {
      return sendErrorResponse("Program name not found", 404);
    }

    const company = await insertCompany(name, position.id, program.id);

    return NextResponse.json(company);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    return sendErrorResponse("An unexpected error occurred", 500);
  }
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
