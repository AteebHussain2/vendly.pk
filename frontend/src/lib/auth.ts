"use server"

import 'dotenv';
import { jwtVerify, importSPKI } from "jose";
import { cookies } from "next/headers";

interface AuthPayload {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

// -------------------------------- LOAD PUBLIC KEY -----------------------------------

const PUBLIC_KEY_PEM = process.env.JWT_PUBLIC_KEY!;

let cachedPublicKey: any = null;

async function getPublicKey() {
    if (cachedPublicKey) return cachedPublicKey;

    const pem = PUBLIC_KEY_PEM.replace(/\\n/g, "\n");
    cachedPublicKey = await importSPKI(pem, "RS256");
    return cachedPublicKey;
}

export async function verifyJWT(token: string): Promise<AuthPayload | null> {
    try {
        const publicKey = await getPublicKey();
        const { payload } = await jwtVerify(token, publicKey, { algorithms: ["RS256"] });
        return payload as unknown as AuthPayload;
    } catch (error) {
        return null;
    }
}

export async function auth(): Promise<AuthPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;
    if (!token) return null;
    return await verifyJWT(token);
}

export async function getJWT() {
    const cookieStore = await cookies();
    return cookieStore.get("auth")?.value;
}

export async function deleteJWT() {
    const cookieStore = await cookies();
    cookieStore.delete("auth");
}