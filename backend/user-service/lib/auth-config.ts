import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { importPrivateKey } from "./keys";

const rawPrivate = await Bun.file('./private.pem').text();
const privateKey = await importPrivateKey(rawPrivate);

export const authConfig = new Elysia({ name: 'auth-config' })
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
    );