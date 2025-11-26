'use client'
import { ToastProvider } from "@/context/ToastContext";
import { SessionProvider } from "next-auth/react";

const ChatLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
      <SessionProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </SessionProvider>
  );
}

export default ChatLayout