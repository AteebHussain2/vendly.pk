"use server";

import { typeSignUpSchema } from "@/lib/validations/auth";
import { cookies } from "next/headers";
import { getUrl } from "@/lib/utils";
import axios from "axios";

interface SignUpResponse {
    message: string;
    data?: {
        userId: string;
        name: string;
        username: string;
        email: string;
        refreshed: boolean;
    };
};

interface ActionResult {
    success: boolean;
    message: string;
    data?: SignUpResponse["data"];
}

export async function signUp(
    data: typeSignUpSchema,
): Promise<ActionResult> {
    if (data.password !== data.confirmPassword) {
        return { success: false, message: "Passwords do not match!" };
    }

    try {
        const url = getUrl("/auth/signin");
        const res = await axios.post<{ token: string } & SignUpResponse>(url, {
            firstName: data.firstName,
            lastBame: data.lastName,
            username: data.username,
            email: data.email,
            password: data.password,
            privacyPolicy: data.privacyPolicy,
            newsletter: data.newsletterOptIn,
        });

        const { token, message, data: responseData } = res.data;

        const cookieStore = await cookies();
        cookieStore.set("auth", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return {
            success: true,
            message,
            data: responseData,
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message ?? "Signup failed. Please try again.",
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    }
}