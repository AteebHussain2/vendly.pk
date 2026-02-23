"use server"

import { jwtVerify, importSPKI } from "jose";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs";

interface AuthPayload {
    userId: string;
    name: string;
    email: string;
    username: string;
    iat?: number;
    exp?: number;
}

interface AuthResult {
    userId: string;
    name: string;
    email: string;
    username: string;
}

// -------------------------------- LOAD PUBLIC KEY -----------------------------------

const publicKeyPem = fs.readFileSync(
    path.join(process.cwd(), "public.pem"),
    "utf-8"
);

export async function auth(): Promise<AuthResult | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth")?.value;

        if (!token) return null;

        const publicKey = await importSPKI(publicKeyPem, "RS256");

        const { payload } = await jwtVerify<AuthPayload>(token, publicKey, {
            algorithms: ["RS256"],
        });

        return {
            userId: payload.userId,
            name: payload.name,
            email: payload.email,
            username: payload.username,
        };

    } catch (error) {
        return null;
    }
}

export async function verifyJWT(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth")?.value;

        if (!token) return false;

        const publicKey = await importSPKI(publicKeyPem, "RS256");

        await jwtVerify(token, publicKey, { algorithms: ["RS256"] });

        return true;
    } catch {
        return false;
    }
}

export async function getJWT() {
    const cookieStore = await cookies();
    return cookieStore.get("auth")?.value;
}

export async function deleteJWT() {
    const cookieStore = await cookies();
    cookieStore.delete("auth");
}