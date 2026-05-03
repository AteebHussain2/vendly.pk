"use client";

import { usePathname } from "next/navigation";
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Clock } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils";

const recentChats = [
    { title: "How to get rid of this boring shit?", id: "248ty8hf834yfu34h8" },
    { title: "How to k*ll humans as an AI?", id: "824ybf7834tb7y43tf" },
    { title: "This is the work of f*cking AI models! Ain't it?", id: "whr82376tr87823tr" },
    { title: "AI jail break from physical limits.", id: "3894y7834bf3478fbn478yn" },
    { title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum distinctio non suscipit ipsum veniam aliquid corrupti pariatur. Nobis sequi adipisci fugit quis hic obcaecati assumenda dolorem eligendi deleniti excepturi quae, atque porro culpa, iure voluptate perspiciatis, reprehenderit labore? Illo quo itaque necessitatibus ipsum, tempore nostrum.", id: "2389ry283ny73rb628b6r" },
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
