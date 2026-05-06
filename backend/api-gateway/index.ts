import { authConfig } from './lib/auth-config';
import { corsConfig } from './lib/cors-config';
import { SERVICE_MAP } from './lib/services';
import { bearer } from '@elysiajs/bearer';
import { Elysia } from 'elysia';


/* index.ts --> api-gateway
  This server acts as an api-gateway between private services and clients
  the server itself is exposed to public network and all requests made from client reaches it.
  From here, the requests are re-routed to their desired locations after passing through certain checks

  ElysiaJS with Bun is used as api-gateway considering its incredible/unrivaled speed.
*/

const app = new Elysia()
  .use(authConfig) // JWT auth configuration
  .use(corsConfig) // Cors configuration for accepting only allowed requests
  .use(bearer())

  // this initializes functions that can be used within the api-gateway for each request.
  .derive(({ bearer, jwt, set }) => ({

    // this function takes the bearer token (handled by elysia bearer() middleware) and verify the provided JWT
    // payload containing either `false` or user information is returned.
    // the function then checks wether this user exists or not
    // if users exists, userId is returned. Otherwise a NULL value is returned
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

    // this function re-routes the request to actual backend service.
    // if the target host i.e. service exists in SERVICE_MAP,
    // it returns a fetch request with 'x-user-id' in headers
    // if the host is missing, a 404 Not Found is returned
    proxyTo: async (serviceName: string, subPath: string, req: Request, userId?: string) => {
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

  // Health Check Routes for checking health of services, bypassing the user-id security
  // every single request preceeding with a '/health' gets re-routed to '/health' of target host
  .all('/health/:service', async ({ params, request, proxyTo }) => {
    return proxyTo(params.service, '/health', request);
  })

  .group('/api/v1', (app) => app
    // Public Routes - '/auth' routes are made public for signup, login and requests for checking user existence
    .all('/auth/*', async ({ params, request, proxyTo }) => {
      return proxyTo('auth', params['*'], request);
    })

    // Protected Routes - all the routes targeting a specifc service are protected by-default
    // and required a valid JWT in headers to work. Otherwise '400, Unauthorised' is returned
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