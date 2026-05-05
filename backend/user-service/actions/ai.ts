import { AgentType, AgentVisibility } from "../lib/generated/prisma/enums";
import { prisma } from "../lib/prisma";

export async function getAllPublicAgents() {
    try {
        const agents = await prisma.agent.findMany({
            where: { visibility: AgentVisibility.PUBLIC },
            select: {
                id: true,
                name: true,
                slug: true,
                avatar: true,
                type: true,
            }
        });

        const mainAgentData = agents.find(agent => agent.type === AgentType.MAIN);

        if (!mainAgentData) {
            throw new Error("Main agent (Lawrence?) was not found!")
        };

        const { type, ...mainAgent } = mainAgentData;
        const subAgents = agents
            .filter(agent => agent.type === AgentType.SUB)
            .map(({ type, ...rest }) => rest);

        return {
            status: 200,
            message: "Successful!",
            data: { mainAgent, subAgents }
        };

    } catch (error) {
        return {
            status: 500,
            message: (error as any).message ?? "Something went wrong!",
            data: { mainAgent: {}, subAgents: [{}] }
        }
    }
}

export async function getPublicAgentInfo(slug: string) {
    try {
        const agent = await prisma.agent.findUnique({
            where: { slug, visibility: AgentVisibility.PUBLIC },
            select: {
                id: true,
                name: true,
                slug: true,
                avatar: true,
                description: true,
                type: true
            }
        });

        return {
            status: 200,
            message: "Successful!",
            data: agent
        };

    } catch (error) {
        return {
            status: 500,
            message: (error as any).message ?? "Something went wrong!",
            data: {}
        }
    }
}