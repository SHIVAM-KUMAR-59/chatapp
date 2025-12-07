'use client'

import { ToastProvider } from "@/context/ToastContext";
import { SessionProvider } from "next-auth/react";


const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <ToastProvider>
          {children}
      </ToastProvider>
    </SessionProvider>
  );
}

export default AuthLayout