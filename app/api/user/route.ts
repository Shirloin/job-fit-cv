import UserRepository from "@/repositories/UserRepository";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import ProgramRepository from "@/repositories/ProgramRepository";
import { sendErrorResponse, validateField, validatePasswordFields } from "@/lib/helper";

export async function GET(req: NextRequest) {
    const users = await getAllStudent();

    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const { username, name, role, email, program, campus } = await req.json();


    try {
        validateField(username, "Username field must be filled");
        validateField(name, "Name field must be filled");
        validateField(role, "Role field must be selected");

        if (role.toLowerCase() === "student") {
            validateField(email, "Email field must be filled");
            validateField(program, "Program field must be selected");
            validateField(campus, "Campus field must be filled");
        }

        const existingUserByUsername = await getUserByUsername(username);
        if (existingUserByUsername) {
            throw sendErrorResponse("Username has already been taken", 422);
        }

        if (email.trim().length > 0) {
            const existingUserByEmail = await getUserByEmail(email);
            if (existingUserByEmail) {
                throw sendErrorResponse("Email has already been taken", 422);
            }
        }

        const major = program.trim().length > 0 ? await getProgramByName(program) : null;

        const user = await createAccount(username, name, role, email, major?.id, campus);
        return new NextResponse(JSON.stringify({ user, msg: "Account Inserted" }));

    } catch (error) {
        if (error instanceof NextResponse) {
            return error;
        }
        return sendErrorResponse("An unexpected error occurred", 500);
    }
}
export async function PUT(req: NextRequest) {
    const { id, currentPassword, newPassword, confirmPassword } = await req.json();
    const user = await getUser(id);

    if (!user) {
        return sendErrorResponse("User not found", 404);
    }

    try {
        validatePasswordFields(currentPassword, newPassword, confirmPassword);

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return sendErrorResponse("Current password doesn't match", 422);
        }

        await changePassword(id, newPassword);
        return new NextResponse(JSON.stringify({ msg: "Password saved" }), { status: 200 });

    } catch (error) {
        if (error instanceof NextResponse) {
            return error;
        }
        return sendErrorResponse("An unexpected error occurred", 500);
    }
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

