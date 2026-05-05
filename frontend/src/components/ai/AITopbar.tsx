"use client";

import { useQuery } from "@tanstack/react-query"
import { getAgentInfo } from "@/actions/agents"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const AITopbar = () => {
    return (
        <div className="md:mx-20 mx-10 bg-[#ededf5]/20 border-border border text-foreground md:max-w-[calc(100vw-var(--sidebar-width)-160px)] w-[calc(100%-80px)] h-15 fixed top-3 flex items-center justify-around gap-5 rounded-full backdrop-blur-2xl shadow-lg">
            <div className="flex items-center gap-3">
                <Image
                    src="/android-chrome-512x512.png"
                    alt="image"
                    width={240}
                    height={240}
                    className="size-8! aspect-square object-cover rounded-full bg-accent-foreground/10 border-border border"
                />

                <div className="flex flex-col items-start -space-y-1">
                    <h1 className="text-lg font-semibold text-secondary-foreground">Lawrence</h1>
                    <p className="text-xs text-muted-foreground">Your main AI Agent</p>
                </div>
            </div>

            <Button variant='outline' className="border-border! cursor-pointer bg-transparent">
                Share
            </Button>
        </div>
    )
}

export const AITopbar2 = ({ slug }: { slug: string }) => {
    const { data, isLoading } = useQuery({
        queryFn: async () => await getAgentInfo(slug),
        queryKey: ['agents', slug]
    })

    return (
        <header className="sticky top-0 left-0 right-0 w-full bg-background h-15 border-border border-b shadow-lg flex items-center justify-between md:px-8 px-6 mb-4">
            <div className="flex items-center gap-3">
                <Button
                    asChild
                    variant='ghost'
                    className="cursor-pointer md:hidden block"
                >
                    <Link href='/ai'>
                        <ArrowLeft size={20} />
                    </Link>
                </Button>

                {isLoading ? (
                    <>
                        <Skeleton className="size-8! aspect-square rounded-full" />

                        <div className="flex flex-col items-start space-y-0.5">
                            <Skeleton className="w-20 h-4 rounded-xs!" />
                            <Skeleton className="w-40 h-3 rounded-xs!" />
                        </div>
                    </>
                ) : !isLoading && (
                    <Avatar className="border">
                        <AvatarImage
                            src={data?.avatar ?? undefined}
                            alt={data?.name}
                        />
                        <AvatarFallback>{data?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}

                <div className="flex flex-col items-start -space-y-0.5">
                    <h1 className="font-semibold text-secondary-foreground">
                        {data?.name}
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        {data?.description}
                    </p>
                </div>
            </div>

            <Button variant='outline' className="border-border! cursor-pointer bg-transparent">
                Share
            </Button>
        </header>
    )
}