import { NextRequest, NextResponse } from "next/server";
import UserRepository from "@/repositories/UserRepository";

export async function GET(req: NextRequest, { params }: { params: { nim: string } }) {
    const { nim } = params;

    try {
        const cv = await getCV(nim);

        return NextResponse.json(cv, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'CV not found' }, { status: 404 });
    }
}

async function getCV(nim: string) {
    return await UserRepository.getCV(nim);
}
