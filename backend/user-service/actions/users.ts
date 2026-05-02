import { prisma } from "../lib/prisma";

export async function getUserById(userId: string) {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
}

export async function getUserByUsername(username: string) {
    return await prisma.user.findUnique({
        where: {
            username: username,
        }
    })
}