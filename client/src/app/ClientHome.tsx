"use client"

import Link from "next/link";
import { useMessage } from '@/hooks/useMessage';
import { useEffect } from 'react';

interface ClientHomeProps {
    userCount: number;
    error: string | null;
}

export default function ClientHome({ userCount, error }: ClientHomeProps) {
    const { showError } = useMessage();

    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4">
            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
                    Benvenuto in Directory Utenti 2.0!
                </h1>

                <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-dark text-center">
                    Gestisci facilmente i tuoi utenti e i loro dati.
                </p>

                <div className="text-lg sm:text-xl md:text-2xl text-gray-light font-semibold mb-6">
                    {`Utenti trovati: ${userCount}`}
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {userCount > 0 ? (
                        <>
                            <Link
                                href="/users"
                                className="btn-primary w-full sm:w-auto truncate"
                            >
                                Lista utenti
                            </Link>

                            <Link
                                href="/create-user"
                                className="btn-secondary w-full sm:w-auto truncate"
                            >
                                Nuovo utente
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/create-user"
                            className="btn-primary w-full sm:w-auto truncate"
                        >
                            Nuovo utente
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}