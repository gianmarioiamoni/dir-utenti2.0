// /app/page.tsx
"use client"

import { FC } from "react";
import Link from "next/link";
import { useCount } from "@/hooks/useCount";

const Home: FC = () => {
  const { userCount, isLoading, isError } = useCount();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        Caricamento...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        Errore nel caricamento
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Benvenuto in Directory Utenti 2.0!
      </h1>

      <p className="text-lg md:text-xl mb-6 text-gray-dark text-center">
        Gestisci facilmente i tuoi utenti e i loro dati.
      </p>

      <div className="text-xl md:text-2xl text-gray-light font-semibold mb-6">
        {`Utenti trovati: ${userCount}`}
      </div>

      {userCount > 0 ? (
        <div className="flex space-x-4">
          <Link href="/users" className="btn-primary">
            Vai alla lista utenti
          </Link>

          <Link href="/create-user" className="btn-secondary">
            Crea un nuovo utente
          </Link>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link href="/create-user" className="btn-primary">
            Crea un nuovo utente
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
