import { toast } from "react-toastify";

/**
 * Custom hook per la gestione dei messaggi di errore e successo tramite `react-toastify`.
 * Fornisce due funzioni per mostrare notifiche di errore o successo.
 *
 * @returns {object} Un oggetto contenente:
 * - `showError` (function): Funzione per mostrare un messaggio di errore.
 * - `showSuccess` (function): Funzione per mostrare un messaggio di successo.
 * - `showInfo` (function): Funzione per mostrare un messaggio informativo.
 *
 * @example
 * const { showError, showSuccess, showInfo } = useMessage();
 * showError("Errore durante il salvataggio dei dati");
 * showSuccess("Operazione completata con successo");
 * showInfo("Informazione importante");
 */
export const useMessage = () => {
  /**
   * Mostra un messaggio di errore tramite la libreria `react-toastify`.
   *
   * @param {string} message - Il messaggio di errore da visualizzare.
   */
  const showError = (message: string) => {
    toast.error(message);
  };

  /**
   * Mostra un messaggio di successo tramite la libreria `react-toastify`.
   *
   * @param {string} message - Il messaggio di successo da visualizzare.
   */
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  /**
   * Mostra un messaggio informativo tramite la libreria `react-toastify`.
   *
   * @param {string} message - Il messaggio informativo da visualizzare.
   */
  const showInfo = (message: string) => {
    toast.info(message);
  };

  return {
    showError,
    showSuccess,
    showInfo
  };
};
