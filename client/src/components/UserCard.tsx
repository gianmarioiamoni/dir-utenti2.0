import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Info } from 'lucide-react';

import { useDeleteUser } from '@/hooks/useDeleteUser';
import { useUsers } from '@/hooks/useUsers';

import DeleteUserConfirmDialog from './DeleteUserConfirmDialog';

interface UserCardProps {
    _id: string;
    nome: string;
    cognome: string;
    email: string;
    onDelete?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ _id, nome, cognome, email, onDelete }) => {
    const router = useRouter();

    const [isHovered, setIsHovered] = useState(false);
    const initials = `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();

    // Delete logic
    const { mutate } = useUsers(1); // Ottiene la funzione di mutazione
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const { handleDeleteUser, isDeleting } = useDeleteUser(() => {
        // Ricarica la lista degli utenti dopo la cancellazione
        mutate();
        setIsConfirmDialogOpen(false);
    });

    const handleUserClick = () => {
        router.push(`/user/${_id}`);
    };

    const confirmDelete = () => {
        setIsConfirmDialogOpen(true);
    };

    const cancelDelete = () => {
        setIsConfirmDialogOpen(false);
    };

    const proceedDelete = () => {
        handleDeleteUser(_id);
    };


    return (
        <div className="bg-gray-dark shadow-md rounded-lg p-4 border border-gray-light hover:shadow-lg transition-all relative">

            {/* Contenuto utente con hover effect */}
            <div
                className="relative"

                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent text-foreground rounded-full flex items-center justify-center mr-4 text-xl font-bold">
                        {initials}
                    </div>
                    <div className={`
                        cursor-pointer 
                        transition-all duration-300
                        ${isHovered ? 'filter blur-sm' : ''}
                    `}>
                        <h2 className="text-lg font-semibold">{`${nome} ${cognome}`}</h2>
                        <p className="text-gray-light text-sm">{email}</p>
                    </div>
                </div>

                {/* Overlay per "Clicca per dettagli" */}
                {isHovered && (
                    <div
                        className="absolute inset-0 bg-background rounded-lg bg-opacity-50 flex items-center justify-center cursor-pointer"
                        onClick={handleUserClick}
                    >
                        <span className="text-foreground font-semibold">Clicca per dettagli</span>
                    </div>
                )}
            </div>

            {/* Icona di cancellazione con tooltip */}
            <div
                className="absolute top-2 right-2 cursor-pointer z-10 group"
                onClick={confirmDelete}
            >
                <Trash2
                    className="text-foreground hover:text-accent transition-colors"
                    size={20}
                />
                <div className="absolute hidden group-hover:block bg-background text-foreground text-xs px-2 py-1 rounded -top-8 -left-4 whitespace-nowrap">
                    Cancella utente
                </div>
            </div>

            {/* Dialog di conferma cancellazione */}
            {isConfirmDialogOpen &&
                <DeleteUserConfirmDialog
                    cancelDelete={cancelDelete}
                    proceedDelete={proceedDelete}
                    isDeleting={isDeleting}
                    nome={nome}
                    cognome={cognome}
                />
            }

        </div>
    );
};

export default UserCard;