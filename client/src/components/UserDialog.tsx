'use client';

import { FC, useEffect } from 'react';
import Image from 'next/image';
import { UserData } from '@/interfaces/userInterfaces';
import { useUserData } from '@/hooks/useUserData';

interface UserDialogProps {
  onClose: () => void;
  onSuccess: () => void;
  mode?: 'create' | 'edit';
  _id?: string;
  initialData?: UserData;
}

const UserDialog: FC<UserDialogProps> = ({
  onClose,
  onSuccess,
  mode = 'create',
  _id = '',
  initialData,
}) => {
  const {
    formData,
    setFormData,
    loading,
    validationErrors,
    handleSubmit,
    handleFileUpload,
  } = useUserData({
    onClose,
    onSuccess,
    _id,
    initialData,
    mode,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'create' ? 'Nuovo Utente' : 'Modifica Utente'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                validationErrors?.nome ? 'border-red-500' : ''
              }`}
            />
            {validationErrors?.nome && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.nome}</p>
            )}
          </div>

          <div>
            <label htmlFor="cognome" className="block text-sm font-medium text-gray-700">
              Cognome
            </label>
            <input
              type="text"
              id="cognome"
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                validationErrors?.cognome ? 'border-red-500' : ''
              }`}
            />
            {validationErrors?.cognome && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.cognome}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                validationErrors?.email ? 'border-red-500' : ''
              }`}
            />
            {validationErrors?.email && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="dataNascita" className="block text-sm font-medium text-gray-700">
              Data di Nascita
            </label>
            <input
              type="date"
              id="dataNascita"
              name="dataNascita"
              value={formData.dataNascita}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                validationErrors?.dataNascita ? 'border-red-500' : ''
              }`}
            />
            {validationErrors?.dataNascita && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.dataNascita}</p>
            )}
          </div>

          <div>
            <label htmlFor="fotoProfilo" className="block text-sm font-medium text-gray-700">
              Foto Profilo
            </label>
            <input
              type="file"
              id="fotoProfilo"
              name="fotoProfilo"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full"
            />
            {formData.fotoProfilo && (
              <div className="mt-2">
                <Image
                  src={formData.fotoProfilo}
                  alt="Foto profilo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Annulla
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvataggio...' : mode === 'create' ? 'Crea' : 'Salva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDialog;
