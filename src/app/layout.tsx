import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// Triggering deployment for mobile alignment standardization - 2026-03-12-2312

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tether - Connect & Chat',
  description: 'A premium dating experience better than the rest.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

import { Providers } from '@/components/Providers'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'
import MainLayout from '@/components/MainLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  )
}
