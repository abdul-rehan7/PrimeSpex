import './globals.css';
import type { Metadata } from 'next';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://prime-spex-yfse.vercel.app'),
  title: 'PrimeSpex — Your Business Solutions Partner',
  description:
    'PrimeSpex delivers end-to-end business solutions — web platforms, design systems, and intelligent automation — engineered for performance and craft.',
  openGraph: {
    title: 'PrimeSpex — Your Business Solutions Partner',
    description:
      'Your Business Solutions Partner. Premium digital products for ambitious teams.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PrimeSpex — Your Business Solutions Partner',
    description:
      'Your Business Solutions Partner. Premium digital products for ambitious teams.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Fonts — loaded via link to bypass next/font network restrictions */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#0a0a0a] text-white">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
