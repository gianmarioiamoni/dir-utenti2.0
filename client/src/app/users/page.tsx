"use client";

import React, { useState } from 'react';

import { useUsers } from '@/hooks/useUsers';
import { useMessage } from '@/hooks/useMessage';

import UserCard from '@/components/UserCard';
import Pagination from '@/components/Pagination';
import AddUserDialog from '@/components/AddUserDialog';
import Loader from '@/components/Loader';


const UsersPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, error } = useUsers(currentPage);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showError } = useMessage();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const onClose = () => {
        setIsModalOpen(false);
    };
    

    if (isError) {
        showError(error?.message || "Errore caricamento utenti");
        return;
    }

    return (
        <div className="container flex flex-col min-h-screen px-8 py-8 bg-background text-foreground">

            {/* Modale */}
            <AddUserDialog isOpen={isModalOpen} onClose={onClose} />

            {/* Mostra il loader o lista utenti */}
            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader isLoading={isLoading} />
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Lista Utenti</h1>
                        <button
                            className="btn-primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Aggiungi utente
                        </button>
                    </div>
                    {/* Lista utenti */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {data?.users.map((user) => (
                            <UserCard
                                key={user._id}
                                _id={user._id}
                                nome={user.nome}
                                cognome={user.cognome}
                                email={user.email}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {data?.total && (
                        <div className="mt-20 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(data.total / 10)}
                                onPageChange={handlePageChange}
                            />
                        </div>

                    )}
                </>
            )}
        </div>
    );
};

export default UsersPage;