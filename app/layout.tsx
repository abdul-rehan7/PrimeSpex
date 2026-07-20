import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://primespex.com'),
  title: 'PrimeSpex — Your Business Solutions Partner',
  description:
    'PrimeSpex delivers end-to-end business solutions — web platforms, design systems, and intelligent automation — engineered for performance and craft.',
  openGraph: {
    title: 'PrimeSpex — Your Business Solutions Partner',
    description:
      'Your Business Solutions Partner. Premium digital products for ambitious teams.',
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
