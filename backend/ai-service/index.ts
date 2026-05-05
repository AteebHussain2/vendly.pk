import { aiRoutes } from "./routes/aiRoutes";
import Elysia, { status } from "elysia";

const app = new Elysia()
    .use(aiRoutes)
    .get('/health', () => {
        return status(200, "Everything is healthy!")
    })
    .listen(3000)

console.log(`AI Service is running on http://ai-service:3000`);