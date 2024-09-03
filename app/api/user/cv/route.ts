import { auth } from "@/auth";
import authConfig from "@/auth.config";
import UserRepository from "@/repositories/UserRepository"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const {id, cv} = await req.json()
    const user = await UserRepository.saveCV(id, cv)
    return NextResponse.json(user)
}