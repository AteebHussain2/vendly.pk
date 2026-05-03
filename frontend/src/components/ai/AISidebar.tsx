"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Library, Lock, LogOut, Plus, Search, Toolbox, User2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePathname } from "next/navigation";
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

const subAgents = [
    { name: "Wein", lastMessage: "Ehh? I want to die..." },
    { name: "Souma", lastMessage: "We have to do something about food shortage before building an empire." }
]

const AISidebar = () => {
    const pathname = usePathname();

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
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className="h-12"
                                >
                                    <Link href="/ai/chat/lawrence" className="flex items-center space-x-1">
                                        <User2 size={32} className="size-8! p-1 border border-border bg-black/5 rounded-full" />
                                        <div className="flex flex-col items-start">
                                            <h2 className="font-[501] text-foreground">Lawrence</h2>
                                            <p className="truncate line-clamp-1 text-xs text-muted-foreground">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cumque architecto sint?
                                            </p>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Sub Agents
                    </SidebarGroupLabel>
                    <SidebarContent>
                        <SidebarMenu>
                            {subAgents.map(subAgent => (
                                <SidebarMenuItem key={subAgent.name}>
                                    <Tooltip delayDuration={500}>
                                        <TooltipTrigger asChild>
                                            <SidebarMenuButton
                                                asChild
                                                disabled
                                                className="h-12"
                                            >
                                                <Link
                                                    href={`/upgarde?redirectTo=/ai/chat/${subAgent.name.toLowerCase()}`}
                                                    className="flex items-center space-x-1 text-muted-foreground hover:text-muted-foreground!"
                                                >
                                                    <div className="p-2 border border-border bg-black/5 rounded-full">
                                                        <Lock
                                                            size={28}
                                                            className="size-4!"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col items-start">
                                                        <h2 className="font-[501]">
                                                            {subAgent.name}
                                                        </h2>
                                                        <p className="truncate line-clamp-1 text-xs text-muted-foreground/80">
                                                            {subAgent.lastMessage}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </SidebarMenuButton>
                                        </TooltipTrigger>

                                        <TooltipContent side="right">
                                            Upgrade to unlock more agents.
                                        </TooltipContent>
                                    </Tooltip>

                                    <SidebarMenuBadge>
                                        <Badge variant='outline' className="text-xs! text-primary font-medium">
                                            Upgrade
                                        </Badge>
                                    </SidebarMenuBadge>
                                </SidebarMenuItem>
                            ))}
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
