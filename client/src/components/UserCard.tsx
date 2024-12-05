import React from 'react';

interface UserCardProps {
    nome: string;
    cognome: string;
    email: string;
}

const UserCard: React.FC<UserCardProps> = ({ nome, cognome, email }) => {
    // Genera l'intestazione con le iniziali
    const initials = `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();

    return (
        <div className="bg-gray-dark shadow-md rounded-lg p-4 border border-gray-light hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent text-foreground rounded-full flex items-center justify-center mr-4 text-xl font-bold">
                    {initials}
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{`${nome} ${cognome}`}</h2>
                    <p className="text-gray-light text-sm">{email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserCard;