import { NextRequest, NextResponse } from "next/server";
import UserRepository from "@/repositories/UserRepository";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;

    try {
        const cv = await getCV(username);

        return NextResponse.json(cv, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'CV not found' }, { status: 404 });
    }
}

async function getCV(username: string) {
    return await UserRepository.getCV(username);
}
