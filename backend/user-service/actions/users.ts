import 'dotenv';
import { prisma } from "../lib/prisma";
import nodemailer from 'nodemailer';
import { add, isFuture } from 'date-fns';
import bcrypt from 'bcrypt';
import { STATUS } from '../lib/generated/prisma/enums';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: process.env.AUTH_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    }
})

transporter.verify((error, success) => {
    if (error) console.error(error)
    else console.log(`Ready for messages.\n${success}`)
})

export async function getUserById(userId: string) {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
        },
    })
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
        }
    })
}

export async function getUserByUsername(username: string) {
    return await prisma.user.findUnique({
        where: {
            email: username,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
        }
    })
}

export async function signInUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string,
    newsletter: boolean = false,
    privacyPolicy: boolean
) {
    try {
        if (!/^[a-zA-Z]*$/.test(firstName)) {
            return { code: 400, status: STATUS.FAILED, message: "Name should contain only A-Z a-z" }
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return { code: 400, status: STATUS.FAILED, message: "Email should be of type email@example.com" }
        } else if (password.length < 8) {
            return { code: 400, status: STATUS.FAILED, message: "Password should be of more than 8 characters" }
        } else if (!/^[a-z0-9A-Z_]{3,16}$/.test(username)) {
            return { code: 400, status: STATUS.FAILED, message: "Username contains invalid characters" }
        } else if (!privacyPolicy) {
            return { code: 400, status: STATUS.FAILED, message: "You must agree to terms & conditions" }
        }

        const emailExists = await getUserByEmail(email)
        if (emailExists) return { code: 400, status: STATUS.FAILED, message: "Email already exists! LogIn" }

        const usernameExists = await getUserByUsername(username)
        if (usernameExists) return { code: 400, status: STATUS.FAILED, message: "Username is occupied" }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password_hash,
                username,
                newsletter,
            },
        });

        await sendOTPVerificationEmail(user?.id, email)

        return { code: 200, status: STATUS.SUCCESS, message: "Account created successfully!", data: { userId: user.id, name: `${user?.firstName}${user?.lastName ?? ' ' + user?.lastName}}`, username: user.username, email: user.email, refreshed: false } }
    } catch (error) {
        return { code: 500, status: STATUS.FAILED, message: "Internal Server Error!" };
    }
}

export async function logInUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            password_hash: true,
        },
    });
    if (!user) return null

    const verified = bcrypt.compare(password, user?.password_hash)
    if (!verified) return null

    return { userId: user.id, name: `${user?.firstName}${user?.lastName ?? ' ' + user?.lastName}}`, refreshed: false }
}

export async function sendOTPVerificationEmail(userId: string, email: string) {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Account Verification – Vendly",
            html: `<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eeeeee;">
                    <tr>
                        <td style="padding: 30px 20px; text-align: center; background-color: #ffffff;">
                            <span style="font-size: 24px; font-weight: 900; letter-spacing: 4px; color: #000000;">VENDLY</span>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 20px 40px; text-align: center;">
                            <h2 style="margin-top: 0; color: #111; font-size: 20px;">Verify your email</h2>
                            <p style="font-size: 15px; line-height: 1.5; color: #666;">
                                Enter the following code to finish setting up your Vendly account. This code will expire in 1 hour.
                            </p>

                            <div style="margin: 30px 0; padding: 15px; background-color: #f3f3f3; border-radius: 8px; border: 1px dashed #cccccc;">
                                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #007bff;">
                                    ${otp}
                                </span>
                            </div>

                            <p style="font-size: 13px; color: #999;">
                                If you didn't request this code, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 30px; text-align: center; font-size: 12px; color: #bbbbbb; border-top: 1px solid #f0f0f0;">
                            Sent by Vendly Marketplace <br>
                            vendly.pk
                        </td>
                    </tr>
                </table>
            </div>`
        };

        const otp_hash = await bcrypt.hash(otp, 10)
        const expiresAt = add(Date.now(), { hours: 1 })

        await prisma.userOTPVerification.create({
            data: {
                userId,
                otp: otp_hash,
                expiresAt,
            },
        });

        await transporter.sendMail(mailOptions);

        return { code: 200, status: STATUS.PENDING, message: 'Verification email sent', data: { userId, email } };
    } catch (error) {
        console.error(error);
        return { code: 500, status: STATUS.FAILED, message: 'Internal Server Error!' };
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

        if (!UserOTPRecord) return { code: 400, status: STATUS.FAILED, message: "OTP Record not found" }
        if (!isFuture(UserOTPRecord?.expiresAt)) {
            await prisma.userOTPVerification.deleteMany({ where: { userId } })
            return { code: 400, status: STATUS.FAILED, message: "OTP has expired" }
        }

        const verified = await bcrypt.compare(otp, UserOTPRecord.otp)
        if (!verified) return { code: 400, status: STATUS.FAILED, message: "Incorrect OTP, Account not verified!" }

        await prisma.user.update({
            where: { id: userId },
            data: { verified: true },
        });
        await prisma.userOTPVerification.deleteMany({ where: { userId } })

        return { code: 200, status: STATUS.SUCCESS, message: "User account has been verified!" }
    } catch (error) {
        console.error(error)
        return { code: 500, status: STATUS.FAILED, message: "Internal Server Error!" }
    }
}

export async function resendOTPVerificationEmail(userId: string, email: string) {
    try {
        await prisma.userOTPVerification.deleteMany({ where: { userId } })
        return await sendOTPVerificationEmail(userId, email)
    } catch (error) {
        console.error(error)
        return { code: 500, status: STATUS.FAILED, message: "Internal Server Error!" }
    }
}