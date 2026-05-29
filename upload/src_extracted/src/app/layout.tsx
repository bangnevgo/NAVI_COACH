import type { Metadata } from 'next';
import './globals.css';
import { BRAND } from '@/lib/branding';
import { TemplateProvider } from '@/components/template-provider';

export const metadata: Metadata = {
  title: BRAND.fullName,
  description: BRAND.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
        <TemplateProvider>
          {children}
        </TemplateProvider>
      </body>
    </html>
  );
}
