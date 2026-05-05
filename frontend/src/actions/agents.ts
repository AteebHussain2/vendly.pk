"use server";

import { api, getUrl } from "@/lib/utils";

type Agent = {
    id: string
    name: string
    slug: string
    description: string | null
    avatar: string | null
}

type PublicAgent = {
    mainAgent: Agent,
    subAgents: Agent[]
} | null

export async function getPublicAgents(): Promise<PublicAgent> {
    try {
        const url = getUrl("/users/ai/all-agents");
        const res = await api.get(url);

        if (res.status !== 200) throw new Error(res.statusText ?? "An unexpected error occurred!")

        return res.data.data as PublicAgent

    } catch (error) {
        return null
    }
}

export async function getAgentInfo(slug: string): Promise<Agent | null> {
    try {
        const url = getUrl(`/users/ai/agent-info/${slug}`);
        const res = await api.get(url);

        if (res.status !== 200) throw new Error(res.statusText ?? "An unexpected error occurred!")

        return res.data.data as Agent

    } catch (error) {
        return null
    }
}