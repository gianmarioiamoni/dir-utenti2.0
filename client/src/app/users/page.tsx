"use client";

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import UserCard from '@/components/UserCard';
import Pagination from '@/components/Pagination';
import AddUserDialog from '@/components/AddUserDialog';


const UsersPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, error } = useUsers(currentPage);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const onClose = () => {
        setIsModalOpen(false);
    };

    if (isLoading) return <div className="text-center p-4">Caricamento...</div>;
    if (isError) return <div className="text-center p-4 text-red-500">Errore nel caricamento degli utenti</div>;

    return (
        <div className="container flex flex-col min-h-screen px-8 py-8 bg-background text-foreground">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista Utenti</h1>
                <button
                    className="btn-primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Aggiungi utente
                </button>
            </div>

            {/* Modale */}
            <AddUserDialog isOpen={isModalOpen} onClose={onClose} />

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

            {data?.total && (
                <div className="mt-20 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(data.total / 10)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default UsersPage;