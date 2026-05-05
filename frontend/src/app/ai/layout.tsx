import AISidebar from "@/components/ai/AISidebar";
// import { AITopbar, AITopbar2 } from "@/components/ai/AITopbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen min-w-screen flex items-start justify-start overflow-y-auto overflow-x-hidden">
            <AISidebar isFreeTier />
            <main className="w-full flex-1">
                {children}
            </main>
        </div>
    );
}
