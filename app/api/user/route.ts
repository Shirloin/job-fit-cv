import UserRepository from "@/repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import ProgramRepository from "@/repositories/ProgramRepository";

export async function GET(req: NextRequest) {
    const users = await getAllStudent();
    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const { username, name, role, email, program, campus } = await req.json();
    // console.log(username, name, role, email, program, campus)

    if (username.trim().length === 0 ||
        name.trim().length === 0 ||
        role.trim().length === 0
    ) {
        return new NextResponse(JSON.stringify({ msg: "Username,name, and role must be filled" }), { status: 422 })
    }
    if (role.toLowerCase() === "student" && (email.trim().length === 0 || program.trim().length === 0 || email.trim().length === 0)) {
        return new NextResponse(JSON.stringify({ msg: "Email, program and campus fields must be filled" }), { status: 422 })
    }

    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByUsername) {
        return new NextResponse(
            JSON.stringify({ msg: "Username has already been taken" }),
            { status: 422 }
        );
    }
    if (email.trim().length > 0) {
        const existingUserByEmail = await getUserByEmail(email);
        if (existingUserByEmail) {
            return new NextResponse(
                JSON.stringify({ msg: "Email has already been taken" }),
                { status: 422 }
            );
        }
    }
    let major;
    if (program.trim().length > 0) {
        major = await getProgramByName(program)
    }
    const user = await createAccount(username, name, role, email, major?.id, campus)
    return new NextResponse(JSON.stringify({ user: user, message: "Account Inserted" }))

}
export async function PUT(req: NextRequest) {
    const { id, currentPassword, newPassword, confirmPassword } =
        await req.json();
    const user = await getUser(id);
    if (!user) {
        return new NextResponse(JSON.stringify({ msg: "User not found" }), {
            status: 404,
        });
    }
    if (
        currentPassword.trim().length === 0 ||
        newPassword.trim().length === 0 ||
        confirmPassword.trim().length === 0
    ) {
        return new NextResponse(
            JSON.stringify({ msg: "All fields must be filled" }),
            { status: 422 }
        );
    }
    if (newPassword !== confirmPassword) {
        return new NextResponse(
            JSON.stringify({ msg: "New password and confirm password don't match" }),
            { status: 422 }
        );
    }
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
        return new NextResponse(
            JSON.stringify({ msg: "Current password doesn't match" }),
            { status: 422 }
        );
    }
    await changePassword(id, newPassword);
    return new NextResponse(JSON.stringify({ msg: "Password saved" }), {
        status: 200,
    });
}


async function getUser(id: string) {
    return await UserRepository.getUserById(id);
}

async function getAllStudent() {
    return await UserRepository.getAllStudent();
}

async function changePassword(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserRepository.changePassword(id, hashedPassword);
}

async function getUserByUsername(username: string) {
    return await UserRepository.getUserByUsername(username);
}
async function getUserByEmail(email?: string) {
    return await UserRepository.getUserByEmail(email)
}

async function getProgramByName(program: string) {
    return await ProgramRepository.getProgramByName(program)
}

async function createAccount(username: string, name: string, role: string, email?: string, programId?: string, campus?: string) {
    return await UserRepository.createAccount(username, name, role, email, programId, campus)
}

