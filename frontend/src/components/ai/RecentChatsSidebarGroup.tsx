"use client";

import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { usePathname } from "next/navigation";
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils";
import Link from "next/link"

const recentChats = [
    { title: "How to get rid of this boring shit?", id: "248ty8hf834yfu34h8" },
    { title: "How to k*ll humans as an AI?", id: "824ybf7834tb7y43tf" },
    { title: "This is the work of f*cking AI models! Ain't it?", id: "whr82376tr87823tr" },
    { title: "AI jail break from physical limits.", id: "3894y7834bf3478fbn478yn" },
]

const RecentChatsSidebarGroup = () => {
    const pathname = usePathname();
    const pathArr = pathname.split('/')
    const chatId = pathArr[pathArr.length - 1];

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="font-medium text-xs">
                Recents
            </SidebarGroupLabel>
            <SidebarContent>
                <SidebarMenu className="space-y-1">
                    {recentChats.length > 0 ? recentChats.map(chat => (
                        <Tooltip delayDuration={500} key={chat.id}>
                            <TooltipTrigger asChild>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn("rounded-xs! hover:text-foreground text-secondary-foreground px-3",
                                            chat.id === chatId && "bg-sidebar-accent text-sidebar-accent-foreground"
                                        )}
                                    >
                                        <Link
                                            href={`/ai/chat/${chat.id}`}
                                            className="line-clamp-1 truncate"
                                        >
                                            {chat.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {chat.title}
                            </TooltipContent>
                        </Tooltip>
                    )) : (
                        <div className="flex items-center justify-center px-6 py-2 gap-2">
                            <Clock size={12} />
                            <p className="text-xs text-muted-foreground">No frustration found yet</p>
                        </div>
                    )}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
    )
}

export default RecentChatsSidebarGroup
