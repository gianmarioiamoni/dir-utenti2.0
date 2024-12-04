import { toast, ToastOptions } from "react-toastify";

/**
 * Custom hook per la gestione dei messaggi di errore e successo tramite `react-toastify`.
 * Fornisce due funzioni per mostrare notifiche di errore o successo.
 *
 * @returns {object} Un oggetto contenente:
 * - `showError` (function): Funzione per mostrare un messaggio di errore.
 * - `showSuccess` (function): Funzione per mostrare un messaggio di successo.
 *
 * @example
 * const { showError, showSuccess } = useMessage();
 * showError("Errore durante il salvataggio dei dati");
 * showSuccess("Operazione completata con successo");
 */
export const useMessage = () => {
  /**
   * Mostra un messaggio di errore tramite la libreria `react-toastify`.
   *
   * @param {string} message - Il messaggio di errore da visualizzare.
   * @param {ToastOptions} [options] - Opzioni facoltative per la personalizzazione della notifica.
   */
  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  /**
   * Mostra un messaggio di successo tramite la libreria `react-toastify`.
   *
   * @param {string} message - Il messaggio di successo da visualizzare.
   * @param {ToastOptions} [options] - Opzioni facoltative per la personalizzazione della notifica.
   */
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  return { showError, showSuccess };
};
