'use client'

import { ToastProvider } from "@/context/ToastContext";


const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
      <ToastProvider>
          {children}
      </ToastProvider>
  );
}

export default AuthLayout