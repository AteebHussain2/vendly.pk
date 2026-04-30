import Elysia, { t } from "elysia";
import { getUserByEmail, getUserById, getUserByUsername, logInUser, resendOTPVerificationEmail, signInUser, verifyOTP } from "../actions/users";
import type { TypeLogInData, TypeUserData } from "../lib/types";
import { authConfig } from "../lib/auth-config";

export const authRoutes = new Elysia()
    .use(authConfig)
    // All of the following routes are public by /auth/*
    // signin user by creating account
    .post('/signin', async ({ request, status }) => {
        const data: TypeUserData = await request.body?.json();

        const res = await signInUser(data)

        return status(res.status, { message: res.message, data: res.data, field: res.field });
    }, {
        body: t.Object({
            firstName: t.String(),
            lastName: t.Optional(t.String()),
            username: t.String(),
            email: t.String(),
            password: t.String(),
            privacyPolicy: t.Boolean(),
            newsletter: t.Boolean(),
        })
    })

    // login user with credentails
    .post('/login', async ({ request, status }) => {
        const data: TypeLogInData = await request.body?.json()

        const res = await logInUser(data);

        return status(res.status, { message: res.message, data: res.data, field: res.field });
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String(),
        })
    })

    // Verify email account
    .post('/verify-account', async ({ status, jwt, request, cookie: { auth } }) => {
        const { userId, otp } = await request.body?.json()
        if (!userId || !otp) return status(415, "Invalid or Missing Inputs!");

        const res = await verifyOTP(userId, otp);
        if (!res?.data) return status(res.status, res.message);

        const token = await jwt.sign(res?.data)

        auth?.set({
            value: token,
            httpOnly: true,
            maxAge: 7 * 86400,
            path: '/'
        })

        return status(res.status, res.message)
    })

    // resend OTP
    .post('/resend-otp', async ({ status, request }) => {
        const { userId, email } = await request.body?.json()
        if (!userId || !email) return status(415, "Invalid or Missing Inputs!");

        const res = await resendOTPVerificationEmail(userId, email);

        return status(res.status, { message: res.message, data: res.data })
    })

    // get user existance and data by userId
    .get('/user-exists/:userId', async ({ status, params: { userId } }) => {
        const user = await getUserById(userId);

        return status(200, { userId: user?.id, exists: !!user?.id })
    })

    // get user existance and data by email
    .get('/email-exists/:email', async ({ status, params: { email } }) => {
        const user = await getUserByEmail(email);

        return status(200, { userId: user?.id, exists: !!user?.id })
    })

    // get user existance and data by username
    .get('/username-exists/:username', async ({ status, params: { username } }) => {
        const user = await getUserByUsername(username);

        return status(200, { userId: user?.id, exists: !!user?.id })
    })