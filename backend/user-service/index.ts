import { getUserByEmail, getUserById, getUserByUsername, logInUser, resendOTPVerificationEmail, signInUser, verifyOTP } from "./actions/users";
import type { TypeLogIn, TypeUser } from "./lib/types";
import { importPrivateKey } from "./lib/keys";
import { jwt } from '@elysiajs/jwt';
import { Elysia, t } from 'elysia';

const rawPrivate = await Bun.file('./private.pem').text();
const privateKey = await importPrivateKey(rawPrivate);

const app = new Elysia()
    .use(
        jwt({
            name: 'jwt',
            secret: privateKey,
            alg: 'RS256',
            exp: '7d',
            schema: t.Object({
                userId: t.String(),
                name: t.String(),
                refreshed: t.Boolean(),
            })
        })
    )

    // All of the following routes are public by /auth/*
    // signin user by creating account
    .post('/signin', async ({ request, status }) => {
        const data: TypeUser = await request.body?.json();

        const res = await signInUser(data)

        return status(res.status, { message: res.message, data: res.data, field: res.field });
    })

    // login user with credentails
    .post('/login', async ({ request, status }) => {
        const data: TypeLogIn = await request.body?.json()

        const res = await logInUser(data);

        return status(res.status, { message: res.message, data: res.data, field: res.field });
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

    .get('/user-exists/:userId', async ({ status, params: { userId } }) => {
        const user = await getUserById(userId);

        return status(200, { userId: user?.id, exists: !!user?.id })
    })
    .get('/email-exists/:email', async ({ status, params: { email } }) => {
        const user = await getUserByEmail(email);

        return status(200, { userId: user?.id, exists: !!user?.id })
    })
    .get('/username-exists/:username', async ({ status, params: { username } }) => {
        const user = await getUserByUsername(username);

        return status(200, { userId: user?.id, exists: !!user?.id })
    })

    // All following routes are protected by /users/*
    // refresh the user token
    .post('/refresh', async ({ headers, status, jwt, cookie: { auth } }) => {
        const userId = headers['x-user-id']
        if (!userId) return status(415, "Invalid or Missing Inputs!");

        const user = await getUserById(userId)
        if (!user) return status(401, "Unauthorized!")

        const res = { userId: user?.id, name: `${user?.firstName}${user?.lastName ?? ' ' + user?.lastName}}`, refreshed: true }
        const token = await jwt.sign(res)

        auth?.set({
            value: token,
            httpOnly: true,
            maxAge: 7 * 86400,
            path: '/'
        })

        return status(200, "OK")
    })
    .listen(3000)

console.log(`User Service is running on http://user-service:3000`);