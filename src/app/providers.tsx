"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/tRPC/client/Provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider>
                <Toaster richColors position="top-center" />
                {children}
            </Provider>
        </ThemeProvider>
    );
} 