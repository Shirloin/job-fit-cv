import UserRepository from "@/repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;

    try {
        const cv = await getUserRecommendedCompany(username);
        return NextResponse.json(cv, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'No recommended company' }, { status: 404 });
    }
}

async function getUserRecommendedCompany(username: string) {
    return await UserRepository.getUserRecommendedCompany(username);
}
