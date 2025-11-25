'use client'
import { SessionProvider } from "next-auth/react";

const ChatLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
      <SessionProvider>
          {children}
      </SessionProvider>
  );
}

export default ChatLayout