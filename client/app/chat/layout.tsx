'use client'
import { SessionProvider } from "next-auth/react";

const ChatLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
      <body
      >
        <SessionProvider>
            {children}
        </SessionProvider>
      </body>
  );
}

export default ChatLayout