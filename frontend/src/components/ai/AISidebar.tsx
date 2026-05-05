"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Inbox, Library, Lock, LogOut, Plus, Search, Toolbox, User2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { getPublicAgents } from "@/actions/agents";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { deleteJWT } from "@/lib/auth";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const routes = [
    {
        label: "New Chat",
        href: "/ai",
        icon: Plus
    },
    {
        label: "Search",
        href: "/ai/search",
        icon: Search
    },
    {
        label: "Skills",
        href: "/ai/skills",
        icon: Toolbox
    },
    {
        label: "Memory",
        href: "/ai/memory",
        icon: Library
    },
]

const AISidebar = ({ isFreeTier = true }: { isFreeTier?: boolean }) => {
    const pathname = usePathname();

    const { data, isLoading } = useQuery({
        queryFn: getPublicAgents,
        queryKey: ['agents', 'public'],
    })

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-row! items-center gap-2 font-bold text-xl text-foreground">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg">
                    <Image src="/android-chrome-512x512.png" width={28} height={28} alt="Vendly Logo" />
                </div>
                <span className="hidden sm:inline">Vendly AI</span>
            </SidebarHeader>

            <SidebarContent className="py-5">
                <SidebarMenu className="px-2 space-y-2">
                    {routes.map(route => (
                        <SidebarMenuItem key={route.href}>
                            <SidebarMenuButton
                                asChild
                                className={cn("rounded-xs!",
                                    route.href === pathname && "bg-sidebar-accent text-sidebar-accent-foreground")}
                            >
                                <Link href={route.href}>
                                    <route.icon size={16} />
                                    <span>{route.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

                {/* <RecentChatsSidebarGroup /> */}

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Main Agent
                    </SidebarGroupLabel>
                    <SidebarContent>
                        <SidebarMenu>
                            {isLoading ? (
                                <AgentSkeleton />
                            ) : !isLoading && data?.mainAgent ? (
                                <AgentSidebarItem data={data.mainAgent} isFreeTier={false} />
                            ) : (
                                <SidebarMenuItem>
                                    <p className="h-12 flex items-center justify-center gap-1 truncate line-clamp-1 text-xs text-muted-foreground">
                                        <Inbox size={12} />
                                        Nothin' to show here
                                    </p>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Sub Agents
                    </SidebarGroupLabel>
                    <SidebarContent>
                        <SidebarMenu>
                            {isLoading ? (
                                <AgentSkeleton map={3} />
                            ) : !isLoading && data?.subAgents.length && data.subAgents.length > 0 ? data.subAgents.map(subAgent => (
                                <AgentSidebarItem key={subAgent.slug} data={subAgent} isFreeTier={isFreeTier} />
                            )) : (
                                <SidebarMenuItem>
                                    <p className="h-12 flex items-center justify-center gap-1 truncate line-clamp-1 text-xs text-muted-foreground">
                                        <Inbox size={12} />
                                        Nothin' to show here
                                    </p>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <Button
                    variant='destructive'
                    className="cursor-pointer"
                    onClick={() => deleteJWT()}
                >
                    <LogOut className="" /> Logout
                </Button>
            </SidebarFooter>
        </Sidebar >
    )
}

export default AISidebar


const AgentSkeleton = ({ map = 1 }: { map?: number }) => {
    let arr: string[] = [];
    let count = 1;

    while (count <= map) {
        arr.push(`map_id_${count}`);
        count++;
    }

    return (
        arr.map(id => (
            <SidebarMenuItem key={id}>
                <SidebarMenuButton
                    asChild
                    className="h-12"
                >
                    <Link
                        href={`/ai/chat/`}
                        className="flex items-center space-x-1"
                    >
                        <Skeleton className="size-8! aspect-square! rounded-full" />
                        <div className="w-full flex flex-col items-start gap-1">
                            <Skeleton className="w-full h-3 rounded-xs!" />
                            <Skeleton className="w-3/4 h-2 rounded-xs!" />
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))
    )
}

const AgentSidebarItem = ({ data, isFreeTier = true }: {
    data: {
        id: string,
        name: string,
        slug: string,
        description: string | null,
        avatar: string | null,
    },
    isFreeTier?: boolean
}) => {
    return (
        <SidebarMenuItem>
            <Tooltip delayDuration={500} disableHoverableContent>
                <TooltipTrigger asChild>
                    <SidebarMenuButton
                        asChild
                        className="h-12"
                    >
                        <Link
                            href={`/ai/chat/${data.slug}`}
                            className="flex items-center space-x-1"
                        >
                            {data.avatar ? (
                                <Image
                                    src={data.avatar}
                                    alt={data.name}
                                    width={32}
                                    height={32}
                                    className="size-8! p-1 border border-border bg-black/5 rounded-full"
                                />
                            ) : isFreeTier ? (
                                <Lock
                                    size={32}
                                    className="size-8! p-1 border border-border bg-black/5 rounded-full"
                                />
                            ) : (
                                <User2
                                    size={32}
                                    className="size-8! p-1 border border-border bg-black/5 rounded-full"
                                />
                            )}

                            <div className="flex flex-col items-start">
                                <h2 className="font-[501] text-foreground">
                                    {data.name}
                                </h2>
                                <p className="truncate line-clamp-1 text-xs text-muted-foreground">
                                    {data.description ?? "Lets rack your dollars!"}
                                </p>
                            </div>
                        </Link>
                    </SidebarMenuButton>

                </TooltipTrigger>

                {isFreeTier && (
                    <TooltipContent side="right">
                        Upgrade to unlock more agents.
                    </TooltipContent>
                )}
            </Tooltip>

            {isFreeTier && (
                <SidebarMenuBadge>
                    <Badge variant='outline' className="text-xs! text-primary font-medium">
                        Upgrade
                    </Badge>
                </SidebarMenuBadge>
            )}
        </SidebarMenuItem >
    )
}