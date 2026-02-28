import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// Triggering deployment for official database-backed authentication - 2026-02-28-2345

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tether - Connect & Chat',
  description: 'A premium dating experience better than the rest.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

import { AuthProvider } from '@/context/AuthContext'

import { ToastProvider } from '@/context/ToastContext'
import { MessageProvider } from '@/context/MessageContext'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ToastProvider>
          <AuthProvider>
            <MessageProvider>
              {children}
              <Footer />
            </MessageProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
