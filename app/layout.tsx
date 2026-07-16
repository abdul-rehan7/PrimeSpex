import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://nexusflowlabs.com'),
  title: 'NexusFlow Labs — Premium Software Agency',
  description:
    'NexusFlow Labs designs and engineers premium software products for ambitious teams. Web platforms, design systems, and intelligent automation.',
  openGraph: {
    title: 'NexusFlow Labs — Premium Software Agency',
    description:
      'Premium software product engineering for ambitious teams.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
