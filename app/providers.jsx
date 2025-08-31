'use client'

import { SessionProvider } from 'next-auth/react';
import { setupChartJS } from "@/lib/chart-setup";

export function Providers({ children }) {
    setupChartJS();
    return <SessionProvider>{children}</SessionProvider>;
}
