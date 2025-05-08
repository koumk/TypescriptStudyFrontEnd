import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js 15 + Tailwind CSS v4 + Auth.js Sample',
  description: 'A minimal Next.js 15 App Router project with Tailwind CSS v4 and Auth.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
