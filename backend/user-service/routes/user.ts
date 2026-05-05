import Elysia from "elysia";
import { authConfig } from "../lib/auth-config";
import { getUserById } from "../actions/users";

// All following routes are protected under /users/*

export const userRoutes = new Elysia()
    .use(authConfig)

    // refresh the user token
    .post('/refresh', async ({ headers, status, jwt, cookie: { auth } }) => {
        const userId = headers['x-user-id']
        if (!userId) return status(415, "Invalid or Missing Inputs!");

        const user = await getUserById(userId)
        if (!user) return status(401, "Unauthorized!")

        const res = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName ?? undefined,
            email: user.email,
            username: user.username,
            refreshed: true
        };
        const token = await jwt.sign(res)

        auth?.set({
            value: token,
            httpOnly: true,
            maxAge: 7 * 86400,
            path: '/'
        })

        return status(200, "OK")
    })