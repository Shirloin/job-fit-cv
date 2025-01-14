
import { NextResponse } from "next/server";

export const validateField = (field: string, errorMsg: string) => {
    if (field.trim().length === 0) {
        throw new NextResponse(JSON.stringify({ msg: errorMsg }), { status: 422 });
    }
};

export const sendErrorResponse = (msg: string, status: number) => {
    return new NextResponse(JSON.stringify({ msg }), { status });
};

export const validatePasswordFields = (currentPassword: string, newPassword: string, confirmPassword: string) => {
    if ([currentPassword, newPassword, confirmPassword].some((field) => field.trim().length === 0)) {
        throw sendErrorResponse("All fields must be filled", 422);
    }

    if (newPassword !== confirmPassword) {
        throw sendErrorResponse("New password and confirm password don't match", 422);
    }
};