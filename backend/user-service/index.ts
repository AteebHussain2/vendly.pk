import { Elysia } from 'elysia';
import { authConfig } from "./lib/auth-config";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { aiRoutes } from './routes/ai';

// This is the beginning point of user-service
// all the incoming requests hit this server
// server, by default listens on port 3000

const app = new Elysia()
    .use(authConfig) // JWT authenitication config
    .use(authRoutes) // All public routes for user authenitication
    .use(userRoutes) // All private routes related to user
    .use(aiRoutes) // All routes related to ai and stuff
    .listen(3000)

console.log(`User Service is running on http://user-service:3000`);