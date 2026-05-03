"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import RecentChatsSidebarGroup from "./RecentChatsSidebarGroup";
import { Library, Plus, Search, Toolbox } from "lucide-react";
import { usePathname } from "next/navigation";
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

                <RecentChatsSidebarGroup />
            </SidebarContent>
        </Sidebar >
    )
}

export default AISidebar
