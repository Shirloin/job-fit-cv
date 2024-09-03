import StudentRepository from "@/repositories/StudentRepository";
import UserRepository from "@/repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { id, username, name, email, program } = await req.json()
    if (username.trim().length === 0 || name.trim().length === 0 || email.trim().length === 0 || program.trim().length === 0) {
        return new NextResponse(JSON.stringify({ msg: "All fileds must be filled" }), { status: 422 })
    }
    let user = await getUserById(id)
    const existingUsername = await getUserByUsername(username)
    if (existingUsername && user?.username !== username) {
        return new NextResponse(JSON.stringify({ msg: "Username already taken" }), { status: 422 })
    }
    const existingEmail = await getUserByEmail(email)
    if (existingEmail && user?.email !== email) {
        return new NextResponse(JSON.stringify({ msg: "Email already taken" }), { status: 422 })
    }
    user = await updateStudent(id, username, name, email, program)

    return new NextResponse(JSON.stringify({ user: user }), { status: 200 })
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()
    console.log(id)
    const user = await deleteStudent(id)
    return new NextResponse(JSON.stringify({ user: user }), { status: 200 })
}

async function updateStudent(id: string, username: string, name: string, email: string, program: string) {
    return await StudentRepository.updateStudent(id, username, name, email, program)
}

async function getUserById(id: string) {
    return await UserRepository.getUserById(id)
}

async function getUserByUsername(username: string) {
    return await UserRepository.getUserByUsername(username)
}
async function getUserByEmail(email: string) {
    return await UserRepository.getUserByEmail(email)
}
async function deleteStudent(id: string) {
    return await StudentRepository.deleteStudent(id)
}