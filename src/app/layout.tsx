import {Inter} from 'next/font/google';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {StyledRoot} from './StyledRoot';
import './globals.css';
import React from "react";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import {AuthProvider} from '@/app/providers/AuthProvider';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} inter_59dee874-module__9CtR0q__className`} suppressHydrationWarning>
        <AuthProvider>
            <AppRouterCacheProvider>
                <StyledRoot>
                    <ErrorBoundary>
                        {children}
                    </ErrorBoundary>
                </StyledRoot>
            </AppRouterCacheProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
