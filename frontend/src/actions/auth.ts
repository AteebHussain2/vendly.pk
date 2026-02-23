import { typeLoginSchema, typeSignUpSchema } from "@/lib/validations/auth";
import { api, getUrl } from "@/lib/utils";
import { deleteJWT } from "@/lib/auth";
import axios from "axios";


// -------------------------------- SIGN UP -----------------------------------


interface SignUpResponse {
    message: string;
    field?: "firstName" | "password" | "confirmPassword" | "email" | "username" | "privacyPolicy";
    data?: {
        userId: string;
        email: string;
    };
};

interface SignUpActionResult {
    success: boolean;
    message: string;
    field?: SignUpResponse["field"];
    data?: SignUpResponse["data"];
};

export async function signup(
    data: typeSignUpSchema,
): Promise<SignUpActionResult> {
    if (data.password !== data.confirmPassword) {
        return { success: false, message: "Passwords do not match!", field: "confirmPassword" };
    }

    try {
        await deleteJWT();
        const url = getUrl("/auth/signin");
        const res = await api.post<SignUpResponse>(url, {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            password: data.password,
            privacyPolicy: data.privacyPolicy,
            newsletter: data.newsletterOptIn,
        });
        const { message, data: responseData } = res.data;

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
                field: error.response?.data?.field ?? ""
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred. Please try again."
        };
    }
}


// -------------------------------- LOG IN -----------------------------------


interface LogInResponse {
    message: string;
    field?: "password" | "email";
    data?: {
        userId: string;
        email: string;
    };
};

interface LogInActionResult {
    success: boolean;
    message: string;
    field?: LogInResponse["field"];
    data?: LogInResponse["data"];
};

export async function login(
    data: typeLoginSchema,
): Promise<LogInActionResult> {
    await deleteJWT();

    try {
        const url = getUrl("/auth/login");
        const res = await api.post<LogInResponse>(url, {
            email: data.email,
            password: data.password,
        });
        const { message, data: responseData } = res.data;

        return {
            success: true,
            message,
            data: responseData,
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message ?? "Login failed. Please try again.",
                field: error.response?.data?.field ?? undefined,
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    }
};


// -------------------------------- VERIFY EMAIL -----------------------------------


interface OtpActionResult {
    success: boolean;
    message: string;
}

export async function verifyEmail({
    userId,
    otp,
}: {
    userId: string;
    otp: string;
}): Promise<OtpActionResult> {
    try {
        const url = getUrl("/auth/verify-account");
        const res = await api.post(url, { userId, otp });

        return {
            success: true,
            message: res.data?.message ?? "Email verified successfully!",
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message ?? "Invalid or expired OTP.",
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    }
}


// -------------------------------- RESEND OTP -----------------------------------


export async function resendOtp({
    userId,
    email,
}: {
    userId: string;
    email: string;
}): Promise<OtpActionResult> {
    try {
        const url = getUrl("/auth/resend-otp");
        const res = await api.post(url, { userId, email });

        return {
            success: true,
            message: res.data?.message ?? "OTP sent successfully!",
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message ?? "Failed to resend OTP.",
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    }
}