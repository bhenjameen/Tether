import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// Triggering deployment for official database-backed authentication

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
              <div className="px-6 md:px-0 min-h-screen">
                {children}
              </div>
            </MessageProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
