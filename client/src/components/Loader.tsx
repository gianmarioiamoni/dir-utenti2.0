import { FC } from "react";

/**
 * Proprietà del componente `Loader`.
 *
 * @typedef {Object} LoaderProps
 * @property {boolean} isLoading - Indica se il caricamento è in corso.
 * @property {string} [msg] - Messaggio da visualizzare durante il caricamento.
 */
interface LoaderProps {
    isLoading: boolean;
    msg?: string;
}

/**
 * Componente per visualizzare un'animazione di caricamento.
 *
 * @component
 * @param {LoaderProps} props - Proprietà passate al componente.
 * @returns {JSX.Element | null} - Il componente di caricamento se `isLoading` è `true`, altrimenti `null`.
 *
 * @example
 * <Loader isLoading={true} />
 */
const Loader: FC<LoaderProps> = ({ isLoading, msg = "Caricamento Utenti..." }: LoaderProps) => {
    return isLoading ? (
        <div className="flex flex-col items-center justify-center loader-container">
            {/* Animazione caricamento */}
            <div className="loader" />
            <p className="loader-text">Caricamento Utenti...</p>
        </div>
    ) : null;
};

export default Loader;
