import Elysia, { status } from "elysia";
import { authConfig } from "../lib/auth-config";
import { getAllPublicAgents, getPublicAgentInfo } from "../actions/ai";

// All following routes are protected under /users/ai/*

export const aiRoutes = new Elysia()
    .use(authConfig)
    .group('/ai', (app) => app
        .get('/all-agents', async () => {
            const res = await getAllPublicAgents()

            return status(res.status, { message: res.message, data: res.data })
        })
        .get('/agent-info/:slug', async ({ params }) => {
            const res = await getPublicAgentInfo(params.slug)

            return status(res.status, { message: res.message, data: res.data })
        })
    )