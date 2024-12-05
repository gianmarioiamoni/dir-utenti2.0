"use client";

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import UserCard from '@/components/UserCard';
import Pagination from '@/components/Pagination';

const UsersPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, error } = useUsers(currentPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <div className="text-center p-4">Caricamento...</div>;
    if (isError) return <div className="text-center p-4 text-red-500">Errore nel caricamento degli utenti</div>;

    return (
        <div className="container px-8 py-8 bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6">Lista Utenti</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.users.map((user) => (
                    <UserCard
                        key={user._id}
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