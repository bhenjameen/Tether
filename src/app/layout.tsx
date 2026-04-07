import './globals.css'
// Triggering deployment for mobile alignment standardization - 2026-03-12-2312

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
      <body className="antialiased" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }} suppressHydrationWarning>
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
