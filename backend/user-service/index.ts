import { Elysia } from 'elysia';
import { authConfig } from "./lib/auth-config";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { aiRoutes } from './routes/ai';

const app = new Elysia()
    .use(authConfig)
    .use(authRoutes)
    .use(userRoutes)
    .use(aiRoutes)
    .listen(3000)

console.log(`User Service is running on http://user-service:3000`);