"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/context/ToastContext";
import { MessageProvider } from "@/context/MessageContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { UIProvider } from "@/context/UIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <MessageProvider>
          <NotificationProvider>
            <UIProvider>
              {children}
            </UIProvider>
          </NotificationProvider>
        </MessageProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
