'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { FaUser, FaEnvelope, FaBirthdayCake } from 'react-icons/fa';
import UserBreadcrumbs from '@/components/UserBreadcrumbs';
import { calculateAge } from '@/services/userServices';

interface User {
    _id: string;
    nome: string;
    cognome: string;
    email: string;
    dataNascita: Date;
    fotoProfilo?: string;
}

interface UserDetailsContentProps {
    userDetails: Omit<User, 'dataNascita'> & { dataNascita: string };
}

export default function UserDetailsContent({ userDetails }: UserDetailsContentProps) {
    // Convert string date to Date object
    const user: User = {
        ...userDetails,
        dataNascita: new Date(userDetails.dataNascita)
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <UserBreadcrumbs userDetails={user} />
            <Card className="mt-6 shadow-lg">
                <CardHeader className="flex justify-center items-center pb-0">
                    <Image
                        src={user.fotoProfilo || "/placeholder-avatar.png"}
                        alt={`Foto profilo di ${user.nome} ${user.cognome}`}
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-gray-light"
                        priority
                    />
                </CardHeader>
                <CardBody>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-primary">
                            {user.nome} {user.cognome}
                        </h1>
                        <Divider className="my-4" />
                        <div className="space-y-4">
                            <div className="flex items-center justify-center">
                                <FaUser className="mr-3 text-foreground" />
                                <span>{user.nome} {user.cognome}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <FaEnvelope className="mr-3 text-foreground" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <FaBirthdayCake className="mr-3 text-foreground" />
                                <span>
                                    {new Date(user.dataNascita).toLocaleDateString()} ({calculateAge(user.dataNascita)} anni)
                                </span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
