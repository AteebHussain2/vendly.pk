"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signUpSchema, typeSignUpSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { setSessionData } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { signup } from "@/actions/auth";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function SignUp({ redirectUrl }: { redirectUrl: string }) {
    const router = useRouter();
    const form = useForm<typeSignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            privacyPolicy: false,
            newsletterOptIn: false,
        },
        mode: "onTouched",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: typeSignUpSchema) => signup(data),

        onSuccess: (result) => {
            if (!result.success) {
                if (result.field) {
                    form.setError(result.field, {
                        type: "server",
                        message: result.message,
                    });
                    return;
                }

                toast.error(result.message, { id: "signup" });
                return;
            };

            setSessionData(result.data?.userId ?? '', result.data?.email ?? '')
            toast.success(result.message ?? "Account created successfully!", { id: "signup" });

            const params = new URLSearchParams({
                from: "signup",
                redirectTo: redirectUrl,
            });

            router.push(`/verification?${params.toString()}`);
        },

        onError: (error: Error) => {
            console.error("Sign-up error:", error);
            toast.error(error.message ?? "Something went wrong. Please try again.", { id: "signup" });
        },
    });

    return (
        <Card className="w-full max-w-lg shadow-lg">
            {/* ── Header ── */}
            <CardHeader className="flex flex-col items-center gap-1 pb-4">
                <CardTitle className="flex flex-row items-center gap-3">
                    <Image src="/favicon.ico" alt="Vendly Logo" width={32} height={32} />
                    <span className="text-2xl font-bold tracking-tight">Vendly</span>
                </CardTitle>
                <CardDescription className="text-center">
                    Create your account to get started
                </CardDescription>
            </CardHeader>

            {/* ── Form ── */}
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => mutate(values))}
                        className="space-y-5"
                        noValidate
                    >
                        {/* Row: First + Last name */}
                        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 items-start">
                            {/* First Name */}
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            First Name <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jane" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Last Name */}
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Last Name{" "}
                                            <span className="text-muted-foreground text-xs font-normal">
                                                (optional)
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </FieldGroup>

                        {/* Username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Username <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="jane_doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                    <FormLabel>
                                        Password <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Confirm Password{" "}
                                        <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Divider */}
                        <hr className="border-border" />

                        {/* Privacy Policy — required */}
                        <FormField
                            control={form.control}
                            name="privacyPolicy"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start gap-3">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="flex flex-wrap cursor-pointer items-center gap-1">
                                            I agree to the
                                            <Link target="_blank" href="/privacy" className="text-primary">
                                                privacy policies,
                                            </Link>
                                            <Link target="_blank" href="/data-usage" className="text-primary">
                                                usage,
                                            </Link>
                                            and
                                            <Link target="_blank" href="/guidelines" className="text-primary">
                                                guidelines
                                            </Link>
                                            <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Newsletter opt-in — optional */}
                        <FormField
                            control={form.control}
                            name="newsletterOptIn"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start gap-3 text-muted-foreground">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="cursor-pointer">
                                            Receive notifications for newsletters, updates, and
                                            events
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full cursor-pointer!"
                            disabled={form.formState.isSubmitting || isPending}
                        >
                            {form.formState.isSubmitting || isPending ? "Creating account…" : "Create Account"}
                        </Button>
                    </form>
                </Form>
            </CardContent>

            {/* ── Footer ── */}
            <CardFooter className="flex justify-center pt-0">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary">
                        Log in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}