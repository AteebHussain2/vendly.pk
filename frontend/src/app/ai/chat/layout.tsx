import AISidebar from "@/components/ai/AISidebar";
import { AITopbar, AITopbar2 } from "@/components/ai/AITopbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full flex-1">
            {/* <AITopbar /> */}
            <AITopbar2 />
            {children}
        </main>
    );
}
