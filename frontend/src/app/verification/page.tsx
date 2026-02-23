import EmailVerification from "@/components/auth/EmailVerification";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

interface VerificationPageProps {
    searchParams: Promise<{
        from?: string;
        userId?: string;
        email?: string;
        redirectTo?: string;
    }>;
}

const VerificationPage = async ({ searchParams }: VerificationPageProps) => {
    const { from, redirectTo } = await searchParams;

    const session = await auth();
    if (session?.userId) {
        redirect(redirectTo ?? "/dashboard");
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-10">
            <EmailVerification
                from={from ?? "signup"}
                redirectTo={redirectTo ?? "/dashboard"}
            />
        </main>
    );
};

export default VerificationPage;