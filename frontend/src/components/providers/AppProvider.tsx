'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImageKitProvider } from '@imagekit/next';
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "../ui/tooltip";
import NextTopProvider from 'nextjs-toploader';
import { useState } from 'react';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                refetchOnWindowFocus: true,
            },
        },
    }))
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    if (!urlEndpoint) {
        throw new Error('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not defined');
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ImageKitProvider urlEndpoint={urlEndpoint}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <NextTopProvider color='#8e51ff' showSpinner={false} />
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </ThemeProvider>
            </ImageKitProvider>
        </QueryClientProvider>
    );
};

export default AppProvider;