import PositionRepository from "@/repositories/PositionRepository"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest){
    const positions = await getAllPosition()
    return NextResponse.json(positions)
}

export async function POST(req: NextRequest){
    
}

async function getAllPosition(){
    return await PositionRepository.getAllPosition()
}