// /app/layout.tsx
"use client";

import "./globals.css";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastProvider } from "@/components/wrappers/ToastWrapper"
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>
          {children}
          <ToastProvider
            position="top-right" // Posizione del toast
            autoClose={5000}     // Tempo di auto-chiusura in millisecondi
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" // Può essere "light", "dark" o "colored"
          />
        </body>
      </html>
    </QueryClientProvider>
  );
}
