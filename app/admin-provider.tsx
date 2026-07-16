'use client';

import { AuthProvider } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
