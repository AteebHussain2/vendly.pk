import Elysia, { status } from "elysia";

export const aiRoutes = new Elysia()
    .get('/ai/:chatId', () => {
        return status(404, "Not Found! Since I haven't create it yet...")
    })