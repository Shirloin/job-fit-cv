// app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import UserRepository from "@/repositories/UserRepository";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await UserRepository.getUserById(id);
        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }
}
