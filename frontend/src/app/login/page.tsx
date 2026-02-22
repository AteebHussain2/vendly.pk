"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema, typeLoginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function LoginPage() {
  const form = useForm<typeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  function onSubmit(values: typeLoginSchema) {
    console.log("Login submitted:", values);
    // TODO: call your auth API here
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        {/* ── Header ── */}
        <CardHeader className="flex flex-col items-center gap-1 pb-4">
          <CardTitle className="flex flex-row items-center gap-3">
            <Image src="/favicon.ico" alt="Vendly Logo" width={32} height={32} />
            <span className="text-2xl font-bold tracking-tight">Vendly</span>
          </CardTitle>
          <CardDescription className="text-center">
            Log in to your account to continue
          </CardDescription>
        </CardHeader>

        {/* ── Form ── */}
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jane@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>
                        Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <a
                        href="/forgot-password"
                        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in…" : "Log In"}
              </Button>
            </form>
          </Form>
        </CardContent>

        {/* ── Footer ── */}
        <CardFooter className="flex justify-center pt-0">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-medium underline underline-offset-2 hover:text-primary"
            >
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}