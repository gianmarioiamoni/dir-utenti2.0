import { FC } from 'react';
import { Trash2, Edit } from 'lucide-react';

import { useUserCard } from '@/hooks/useUserCard';

import { User } from '@/interfaces/userInterfaces';

import DeleteUserConfirmDialog from './DeleteUserConfirmDialog';
import EditUserDialog from './UserDataDialog';

interface UserCardProps {
    user: User;
    page: number;
}

const UserCard: FC<UserCardProps> = ({ user, page }) => {

    const { _id, nome, cognome, email } = user;
    const initials = `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();

    const {
        isHovered,
        setIsHovered,
        handleUserClick,
        isEditDialogOpen,
        openEditDialog,
        closeEditDialog,
        isConfirmDialogOpen,
        isDeleting,
        confirmDelete,
        cancelDelete,
        proceedDelete } = useUserCard({ _id, page });


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

            {/* Icone di edit e delete */}
            <div className="absolute top-2 right-2 flex space-x-2 z-10">
                {/* Icona di edit con tooltip */}
                <div className="group cursor-pointer" onClick={openEditDialog}>
                    <Edit
                        className="text-foreground hover:text-accent transition-colors"
                        size={20}
                    />
                    <div className="absolute hidden group-hover:block bg-background text-foreground text-xs px-2 py-1 rounded -top-8 left-0 whitespace-nowrap">
                        Modifica utente
                    </div>
                </div>

                {/* Icona di cancellazione con tooltip */}
                <div className="group cursor-pointer" onClick={confirmDelete}>
                    <Trash2
                        className="text-foreground hover:text-accent transition-colors"
                        size={20}
                    />
                    <div className="absolute hidden group-hover:block bg-background text-foreground text-xs px-2 py-1 rounded -top-8 -left-4 whitespace-nowrap">
                        Cancella utente
                    </div>
                </div>
            </div>

            {/* Dialogo di modifica */}
            {isEditDialogOpen && (
                <EditUserDialog
                    isOpen={isEditDialogOpen}
                    onClose={closeEditDialog}
                    page={page}
                    _id={_id}
                    mode="edit"
                />
            )}

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