import { useEffect } from "react";
import { useMessage } from "@//hooks/useMessage";

/**
 * Custom hook per gestire e visualizzare gli errori.
 * Viene utilizzato per mostrare un messaggio di errore tramite il hook `useMessage` quando si verifica un errore.
 *
 * @param {boolean} isError - Indica se si è verificato un errore. Se `true`, si attiva la visualizzazione dell'errore.
 * @param {unknown} error - L'errore che si è verificato. Può essere un'istanza di `Error` o un errore generico.
 * @returns {void} - Questo hook non restituisce nulla. Gestisce solo l'effetto collaterale della visualizzazione dell'errore.
 *
 * @example
 * useErrorHandling(isError, error);
 * // Se `isError` è `true` e `error` è un oggetto `Error`, verrà mostrato un messaggio di errore.
 * // Se `error` non è un'istanza di `Error`, verrà mostrato un errore generico.
 */
export const useErrorHandling = (isError: boolean, error: unknown) => {
  const { showError } = useMessage();

  useEffect(() => {
    if (isError) {
      showError(
        error instanceof Error
          ? error.message
          : "Errore generico nel caricamento dati"
      );
    }
  }, [isError, error, showError]);
};
