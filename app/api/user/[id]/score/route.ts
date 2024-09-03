import StudentScoreRepository from "@/repositories/StudentScoreRepository"
import UserRepository from "@/repositories/UserRepository"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
    const id = params.id;
    const scores = await getStudentScore(id)
    return NextResponse.json(scores)
}
async function getStudentScore(id: string){
    return await StudentScoreRepository.getStudentScore(id)
}