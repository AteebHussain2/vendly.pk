import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

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

export const AITopbar2 = () => {
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
        </header>
    )
}