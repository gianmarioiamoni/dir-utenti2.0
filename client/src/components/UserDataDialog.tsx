import React, { FC } from "react";
import { useUserData } from "@/hooks/useUserData";
import Loader from "./Loader";
import { useMessage } from "@/hooks/useMessage";

interface UserDataDialogProps {
    isOpen: boolean;
    onClose: () => void;
    _id?: string;
    mode?: 'create' | 'edit';
}

const UserDataDialog: FC<UserDataDialogProps> = ({
    isOpen,
    onClose,
    _id = '',
    mode = 'create'
}) => {
    const { showSuccess } = useMessage();
    const successMessage = mode === 'create'
        ? "Utente aggiunto con successo!"
        : "Utente modificato con successo!";

    const {
        formData,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancel,
        loading,
        validationErrors
    } = useUserData({
        onClose,
        onSuccess: () => showSuccess(successMessage),
        _id,
        mode
    });
    
    if (!isOpen) return null;

    const dialogTitle = mode === 'create'
        ? "Aggiungi Nuovo Utente"
        : "Modifica Utente";

    // Bottone di submit dinamico
    const submitButtonText = mode === 'create' ? "Crea" : "Modifica";

    return (
        <div className="fixed inset-0 bg-background bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg max-w-lg w-full relative z-60">
                
                <h2 className="text-xl font-semibold mb-4">{dialogTitle}</h2>

                {/* Area Errori */}
                {validationErrors?.serverError && (
                    <div className="bg-bg-error text-text-error p-2 rounded mb-4">
                        <ul>
                            {Object.keys(validationErrors).map((key) => (
                                <li key={key}>{validationErrors[key]}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Nome */}
                <div className="mb-4">
                    <label className="block text-sm">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className={`w-full text-gray-dark p-2 border ${validationErrors?.nome ? "border-text-error" : "border-gray-light"} rounded`}
                    />
                    {validationErrors?.nome && <p className="text-text-error text-sm">{validationErrors?.nome}</p>}
                </div>

                {/* Cognome */}
                <div className="mb-4">
                    <label className="block text-sm">Cognome</label>
                    <input
                        type="text"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleChange}
                        className={`w-full text-gray-dark p-2 border ${validationErrors?.cognome ? "border-text-error" : "border-gray-light"} rounded`}
                    />
                    {validationErrors?.cognome && <p className="text-text-error text-sm">{validationErrors?.cognome}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full text-gray-dark p-2 border border-gray-light rounded"
                    />
                </div>

                {/* Data di nascita */}
                <div className="mb-4">
                    <label className="block text-sm">Data di Nascita</label>
                    <input
                        type="date"
                        name="dataNascita"
                        id="dataNascita"
                        value={formData.dataNascita}
                        onChange={handleChange}
                        className={`w-full p-2 text-gray-dark border ${validationErrors?.dataNascita ? "border-text-error" : "border-gray-light"} rounded`}
                    />
                    {validationErrors?.dataNascita && <p className="text-text-error text-sm">{validationErrors?.dataNascita}</p>}
                </div>

                {/* Foto Profilo */}
                <div className="flex flex-col items-center gap-2">
                    <div className="mb-4">
                        <label
                            // className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
                            className="btn-primary cursor-pointer"
                        >
                            Carica Foto Profilo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    e.target.files && handleFileChange(e.target.files[0])
                                }
                                className="hidden"
                            />
                        </label>
                    </div>

                    {loading ? (
                        <Loader isLoading={loading} msg="Caricamento Foto Profilo..." />
                    ) : (
                        formData.fotoProfilo && (
                            <img
                                src={formData.fotoProfilo}
                                alt="Anteprima Foto Profilo"
                                className="w-24 h-24 rounded-full"
                            />
                        )
                    )}
                </div>

                {/* Bottoni di azione */}
                <div className="flex justify-end space-x-2">
                    <button className="btn-secondary" onClick={handleCancel}>
                        Annulla
                    </button>
                    <button className="btn-primary" onClick={handleSubmit}>
                        {submitButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDataDialog;
