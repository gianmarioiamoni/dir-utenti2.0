// /app/layout.tsx
'use client';

import { useEffect } from 'react';
import { ToastProvider } from '@/components/wrappers/ToastWrapper';
import SocketService from '@/services/socketService';
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inizializza Socket.IO
    const socketService = SocketService.getInstance();

    // Cleanup alla disconnessione
    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ToastProvider 
            position="top-right"
            hideProgressBar={false}
            closeOnClick
            autoClose={3000}
            theme="colored"
          />
        </Providers>
      </body>
    </html>
  );
}
