"use client"
import {FC} from "react";

import React from "react";
import Link from "next/link";
import { useUsers } from "@/hooks/useUsers";

const Home: FC<{}> = async () => {
  
  // const { userCount, isLoading, error } = useUsers();
  const { userCount } = await useUsers();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  //       <p>Caricamento in corso...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  //       <p>Si è verificato un errore: {error.message}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground">
      {/* Titolo di benvenuto */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Benvenuto in Directory Utenti 2.0!</h1>

      {/* Frase o slogan */}
      <p className="text-lg md:text-xl mb-6 text-gray-dark text-center">Gestisci facilmente i tuoi utenti e i loro dati.</p>

      {/* Numero di utenti */}
      <div className="text-xl md:text-2xl text-gray-light font-semibold mb-6">
        {`Utenti trovati: ${userCount}`}
      </div>

      {/* Rendering condizionale dei bottoni */}
      {userCount > 0 ? (
        <div className="flex space-x-4">
          {/* Bottone per la lista utenti */}
          <Link href="/users" passHref>
            <button className="btn-primary">
              Vai alla lista utenti
            </button>
          </Link>

          {/* Bottone per creare un nuovo utente */}
          <Link href="/create-user" passHref>
            <button className="btn-secondary">
              Crea un nuovo utente
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex space-x-4">
            {/* Bottone per creare un nuovo utente */}
            <Link href="/create-user" passHref>
              <button className="btn-primary">
                Crea un nuovo utente
              </button>
            </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
