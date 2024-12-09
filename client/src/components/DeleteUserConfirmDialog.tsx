import { FC } from "react";

interface ConfirmDialogProps {
    cancelDelete: () => void;
    proceedDelete: () => void;
    isDeleting: boolean;
    nome: string;
    cognome: string;
}

const DeleteUserConfirmDialog: FC<ConfirmDialogProps> = ({cancelDelete, proceedDelete, isDeleting, nome, cognome}) => {
    
    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-xl border border-gray-light">
                <h2 className="text-xl font-bold mb-4">Conferma cancellazione</h2>
                <p className="mb-4">Sei sicuro di voler cancellare l'utente {nome} {cognome}?</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={cancelDelete}
                        className="btn-secondary mr-2"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={proceedDelete}
                        className="btn-danger"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Cancellazione...' : 'Conferma'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserConfirmDialog