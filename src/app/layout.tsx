import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
              {children}
            </MessageProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
