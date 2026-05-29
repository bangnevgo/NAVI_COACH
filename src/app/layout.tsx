import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { BRAND } from '@/lib/branding';
import { TemplateProvider } from '@/components/template-provider';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: BRAND.fullName,
  description: BRAND.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`} style={{ margin: 0, fontFamily: "'DM Sans', var(--font-dm-sans), -apple-system, sans-serif" }}>
        <TemplateProvider>
          {children}
        </TemplateProvider>
      </body>
    </html>
  );
}
