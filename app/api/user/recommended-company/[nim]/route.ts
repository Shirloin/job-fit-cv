import UserRepository from "@/repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { nim: string } }) {
    const { nim } = params;

    try {
        const cv = await getUserRecommendedCompany(nim);
        return NextResponse.json(cv, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'No recommended company' }, { status: 404 });
    }
}

async function getUserRecommendedCompany(nim: string) {
    return await UserRepository.getUserRecommendedCompany(nim);
}
