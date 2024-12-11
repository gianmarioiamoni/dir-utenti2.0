"use client";

import React, { FC } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useMessage } from '@/hooks/useMessage';

import UserCard from '@/components/UserCard';
import UserSearchBar from '@/components/UserSearchBar';
import Pagination from '@/components/Pagination';
import AddUserDialog from '@/components/UserDataDialog';
import Loader from '@/components/Loader';

const UsersPage: FC = () => {
    const {
        data,
        currentPage,
        setCurrentPage,
        searchTerms,
        addSearchTerm,
        removeSearchTerm,
        clearSearch,
        isLoading,
        isError,
        error,
        isModalOpen,
        onCloseModal,
        onOpenModal
    } = useUsers();

    const N_USERS_PER_PAGE = 10;
    const N_GROUPS = 5;

    const { showError } = useMessage();

    if (isError) {
        showError(error?.message || "Errore caricamento utenti");
        return;
    }

    return (
        <div className="container flex flex-col min-h-screen px-8 py-8 bg-background text-foreground">
            <AddUserDialog isOpen={isModalOpen} onClose={onCloseModal} page={currentPage} />

            {/* Barra di ricerca */}
            <UserSearchBar
                onSearch={addSearchTerm}
                searchTerms={searchTerms}
                onRemoveTerm={removeSearchTerm}
                onClearSearch={clearSearch}
            />

            {/* Titolo e bottone di aggiunta utente */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista Utenti</h1>
                <button
                    className="btn-primary"
                    onClick={onOpenModal}
                >
                    Aggiungi utente
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader isLoading={isLoading} />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {data?.users.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                page={currentPage}
                            />
                        ))}
                    </div>

                    {data?.total && (
                        <div className="mt-20 flex justify-center">
                                <Pagination
                                    currentPage={currentPage}
                                    nUsersPerPage={N_USERS_PER_PAGE}
                                    nGroups={N_GROUPS}
                                    totalUsers={data.total}
                                    onPageChange={setCurrentPage}
                                />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UsersPage;