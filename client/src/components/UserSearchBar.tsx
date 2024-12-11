"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface UserSearchBarProps {
    onSearch: (term: string) => void;
    searchTerms?: string[];
    onRemoveTerm: (term: string) => void;
    onClearSearch: () => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({
    onSearch,
    searchTerms = [],
    onRemoveTerm,
    onClearSearch
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        // <div className="w-full max-w-md mx-auto mb-6">
        <div className="w-full max-w-md mx-6">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    placeholder="Cerca utenti per nome, cognome o email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-2 text-gray-dark border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                >
                    🔍
                </button>
            </form>

            {searchTerms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {searchTerms.map((term) => (
                        <div
                            key={term}
                            className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                        >
                            {term}
                            <button
                                onClick={() => onRemoveTerm(term)}
                                className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    {searchTerms.length > 1 && (
                        <button
                            onClick={onClearSearch}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Cancella tutto
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserSearchBar;