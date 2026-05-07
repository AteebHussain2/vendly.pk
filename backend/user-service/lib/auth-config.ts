import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { importPrivateKey } from "./keys";

const rawPrivate = await Bun.file('./private.pem').text();
const privateKey = await importPrivateKey(rawPrivate);

// auth-config.ts reads the private key for encoding, 
// gets the cryptographic privateKey and uses @elysiajs/jwt
// for defining JWT verification schema name as 'jwt'
// the configuration is then returned as "authConfig"

export const authConfig = new Elysia({ name: 'auth-config' })
    .use(
        jwt({
            name: 'jwt',
            secret: privateKey,
            alg: 'RS256',
            exp: '7d',
            schema: t.Object({
                userId: t.String(),
                firstName: t.String(),
                lastName: t.Optional(t.String()),
                email: t.String(),
                username: t.String(),
                refreshed: t.Boolean(),
            })
        })
    );