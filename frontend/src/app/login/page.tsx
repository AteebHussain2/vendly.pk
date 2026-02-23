import { getRedirectUrl } from "@/lib/utils";
import LogIn from "@/components/auth/LogIn";

interface LogInPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

export default async function LoginPage({ searchParams }: LogInPageProps) {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams(resolvedParams as Record<string, string>);
  const redirectUrl = getRedirectUrl(params);

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <LogIn redirectUrl={redirectUrl} />
    </main>
  );
}