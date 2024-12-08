import React, { FC, useEffect} from "react";
import { useUserForm } from "../hooks/useUserForm";

interface AddUserDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddUserDialog: FC<AddUserDialogProps> = ({ isOpen, onClose }) => {
    const {
        formData,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancel, 
        loading,
        // error,
        validationErrors } = useUserForm({ onClose });
    
    useEffect(() => {
        console.log("AddUserDialog - validationErrors", validationErrors)
    }, [validationErrors])

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg max-w-lg w-full relative z-60">
                
                <h2 className="text-xl font-semibold mb-4">Aggiungi Nuovo Utente</h2>

                {/* // Area Errori
                {error && (
                    <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
                        <ul>
                            {Object.keys(errors).map((key) => (
                                <li key={key}>{errors[key]}</li>
                            ))}
                        </ul>
                    </div>
                )} */}

                {/* Nome */}
                <div className="mb-4">
                    <label className="block text-sm">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className={`w-full p-2 border ${validationErrors?.nome ? "border-red-500" : "border-gray-light"} rounded`}
                    />
                    {validationErrors?.nome && <p className="text-red-500 text-sm">{validationErrors?.nome}</p>}
                </div>

                {/* Cognome */}
                <div className="mb-4">
                    <label className="block text-sm">Cognome</label>
                    <input
                        type="text"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleChange}
                        className={`w-full p-2 border ${validationErrors?.cognome ? "border-red-500" : "border-gray-light"} rounded`}
                    />
                    {validationErrors?.cognome && <p className="text-red-500 text-sm">{validationErrors?.cognome}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-light rounded"
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
                        className={`w-full p-2 border ${validationErrors?.dataNascita ? "border-red-500" : "border-gray-light"} rounded`}
                    />
                    {validationErrors?.dataNascita && <p className="text-red-500 text-sm">{validationErrors?.dataNascita}</p>}
                </div>

                {/* Foto Profilo */}
                <div className="flex flex-col items-center gap-2">
                    <div className="mb-4">
                        <label
                            className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
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
                        <p>Caricamento...</p>
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
                        Crea
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserDialog;
