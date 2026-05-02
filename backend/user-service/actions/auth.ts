import type { TypeLogInData, TypeUserData } from '../lib/types';
import { getUserByEmail, getUserById, getUserByUsername } from './users';
import { sendOTPVerificationEmail } from "../lib/mailer";
import { prisma } from "../lib/prisma";
import { isFuture } from 'date-fns';
import bcrypt from 'bcrypt';

let cachedFreeTierId: string | null = null;

export async function getORcreateFreeTier() {
    if (cachedFreeTierId) return cachedFreeTierId;

    const tier = await prisma.subscriptionTier.upsert({
        where: { slug: 'free-tier' },
        update: {},
        create: {
            price: 0,
            slug: 'free-tier',
            base_store_limit: 1,
            base_product_limit: 50,
            base_ai_daily_limit: 100,
            base_team_member_limit: 0,
            features: {
                templates: ["simple-store"],
                store_types: ["e-commerce"]
            },
        },
        select: { id: true },
    });

    cachedFreeTierId = tier.id;
    return tier.id;
}

export async function signUpUser(data: TypeUserData) {
    const { firstName, lastName, username, email, password, privacyPolicy, newsletter } = data
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    try {
        if (!privacyPolicy) {
            return { status: 400, message: "You must agree to terms & conditions", field: "privacyPolicy" }
        }
        if (trimmedFirstName.length === 0) {
            return { status: 400, message: "First name is required", field: "firstName" };
        }
        else if (!/^[a-zA-Z\s\-]+$/.test(trimmedFirstName)) {
            return { status: 400, message: "Name should contain only letters, spaces, or hyphens", field: "firstName" };
        }
        else if (trimmedLastName.length !== 0 && !/^[a-zA-Z\s\-]+$/.test(trimmedLastName)) {
            return { status: 400, message: "Name should contain only letters, spaces, or hyphens", field: "lastName" };
        }
        else if (!/^[a-z0-9A-Z_]{3,16}$/.test(username)) {
            return { status: 400, message: "Username contains invalid characters", field: "username" }
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return { status: 400, message: "Email should be of type email@example.com", field: "email" }
        }
        else if (password.length < 8) {
            return { status: 400, message: "Password should be of more than 8 characters", field: "password" }
        }

        const usernameExists = await getUserByUsername(username)
        if (usernameExists) return { status: 400, message: `Username '${username}' is not available`, field: "username" }

        const emailExists = await getUserByEmail(email)
        if (emailExists) return { status: 400, message: "Account already exists! Try to Log-in", field: "email" }

        const password_hash = await bcrypt.hash(password, 10);

        const tierId = await getORcreateFreeTier();

        try {
            const user = await prisma.user.create({
                data: {
                    firstName: trimmedFirstName,
                    lastName: trimmedLastName,
                    email,
                    password_hash,
                    username,
                    newsletter,
                    tierId: tierId
                },
            });

            await sendOTPVerificationEmail(user.id, email)

            return {
                status: 200,
                message: "Account created successfully!",
                data: {
                    userId: user.id,
                    email: user.email,
                }
            }
        } catch (e) {
            return { status: 400, message: "Account already exists!", field: "email" }
        }

    } catch (error) {
        console.error(error)
        return { status: 500, message: "Internal Server Error!" };
    }
}

export async function logInUser(data: TypeLogInData) {
    const { email, password } = data;

    try {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return { status: 400, message: "Email should be of type email@example.com", field: "email" }
        }
        else if (password.length < 8) {
            return { status: 400, message: "Password should be of more than 8 characters", field: "password" }
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                password_hash: true,
            },
        });
        if (!user) return { status: 400, message: "Account don't exists! Try to Sign-up", field: "email" }

        const verified = bcrypt.compare(password, user?.password_hash)
        if (!verified) return { status: 401, message: "Invalid email or password", field: "password" }

        await sendOTPVerificationEmail(user?.id, email)

        return {
            status: 200,
            message: "A verification code has been sent to your email!",
            data: {
                userId: user.id,
                email: user.email,
            }
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error!" };
    }
}

export async function verifyOTP(userId: string, otp: string) {
    try {
        const UserOTPRecord = await prisma.userOTPVerification.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                expiresAt: true,
                otp: true,
            }
        });

        if (!UserOTPRecord) return { status: 400, message: "OTP Record not found" }
        if (!isFuture(UserOTPRecord?.expiresAt)) {
            await prisma.userOTPVerification.deleteMany({ where: { userId } })
            return { status: 400, message: "OTP has expired" }
        }

        const verified = await bcrypt.compare(otp, UserOTPRecord.otp)
        if (!verified) return { status: 400, message: "Incorrect OTP, Account not verified!" }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { verified: true },
        });
        await prisma.userOTPVerification.deleteMany({ where: { userId } })

        return {
            status: 200,
            message: "User account has been verified!",
            data: {
                userId: user.id,
                name: `${user?.firstName}${user?.lastName ?? ' ' + user?.lastName}`,
                username: user.username,
                email: user.email,
                refreshed: false
            }
        }
    } catch (error) {
        console.error(error)
        return { status: 500, message: "Internal Server Error!" }
    }
}

export async function resendOTPVerificationEmail(userId: string) {
    try {
        await prisma.userOTPVerification.deleteMany({ where: { userId } })

        const user = await getUserById(userId);
        if (!user) return { status: 404, message: "User account does not exist!" }

        return await sendOTPVerificationEmail(user.id, user.email)
    } catch (error) {
        console.error(error)
        return { status: 500, message: "Internal Server Error!" }
    }
}