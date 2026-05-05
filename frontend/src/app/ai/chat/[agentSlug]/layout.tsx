import AISidebar from "@/components/ai/AISidebar";
import { AITopbar, AITopbar2 } from "@/components/ai/AITopbar";

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ agentSlug: string }>;
}>) {
    return (
        <main className="w-full flex-1">
            {/* <AITopbar /> */}
            <AITopbar2 slug={(await params).agentSlug} />
            {children}
        </main>
    );
}
