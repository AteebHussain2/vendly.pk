import { authConfig } from './auth-config';
import { bearer } from '@elysiajs/bearer';
import { SERVICE_MAP } from './services';
import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(authConfig)
  .use(bearer())
  .use(cors({
    origin(request) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:80",
        "http://localhost",
      ];

      const requestOrigin = request.headers.get('origin');
      if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
        return true;
      }

      return false;
    },
    credentials: true,
  }))

  .derive(({ bearer, jwt, set }) => ({
    verifyUser: async () => {
      if (!bearer) return null;

      const payload = await jwt.verify(bearer)
      if (!payload) return null;

      const res = await fetch(`http://user-service:3000/user-exists/${payload?.userId}`, {
        method: 'GET',
      })
      if (res.status != 200) return null

      const user = await res.json()
      if (!user?.exists) return null

      return user?.userId
    },

    proxyTo: async (serviceName: string, subPath: string, req: Request, userId?: string) => {
      console.log("REQUEST PROXY TO: ", serviceName, subPath, userId)
      const targetHost = SERVICE_MAP[serviceName as keyof typeof SERVICE_MAP];
      if (!targetHost) {
        set.status = 404;
        return { error: 'Service not found' };
      }

      const url = `${targetHost}/${subPath}${new URL(req.url).search}`;
      const proxyHeaders = new Headers(req.headers);

      if (userId) proxyHeaders.set('X-User-Id', userId);

      return fetch(url, {
        method: req.method,
        headers: proxyHeaders,
        body: req.body
      });
    }
  }))

  // Health Check Routes
  .all('/health/:service', async ({ params, request, proxyTo }) => {
    return proxyTo(params.service, '/health', request);
  })

  .group('/api/v1', (app) => app
    // Public Routes
    .all('/auth/*', async ({ params, request, proxyTo }) => {
      return proxyTo('auth', params['*'], request);
    })

    // Protected Routes
    .all('/:service/*', async ({ params, request, set, status, verifyUser, proxyTo }) => {
      const userId = await verifyUser();
      if (!userId) {
        set.headers[
          'XXX-Authenticate'
        ] = `Bearer realm=sign error=invalid_request`

        return status(400, "Unauthorised!")
      }

      return proxyTo(params.service, params['*'], request, String(userId));
    })
  )
  .listen(3000);

console.log(`Gateway is running on http://localhost:3000`);