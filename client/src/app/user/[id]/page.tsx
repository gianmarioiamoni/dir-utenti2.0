'use client';

import React from 'react';
import Image from 'next/image';

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { FaUser, FaEnvelope, FaBirthdayCake } from 'react-icons/fa';

import UserBreadcrumbs from '@/components/UserBreadcrumbs';
import { getUserDetails, calculateAge } from '@/services/userServices';

interface Props {
    params: { id: string };
}

export default function UserDetailsPage({ params }: Props) {
    const { id } = params;
    const [userDetails, setUserDetails] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            const details = await getUserDetails(id);
            setUserDetails(details);
        };
        fetchUser();
    }, [id]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <UserBreadcrumbs userDetails={userDetails}/>
            <Card className="mt-6 shadow-lg">
                <CardHeader className="flex justify-center items-center pb-0">
                    <Image
                        src={userDetails.fotoProfilo || "/placeholder-avatar.png"}  
                        alt={`Foto profilo di ${userDetails.nome} ${userDetails.cognome}`}
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-gray-light"
                        priority
                    />
                </CardHeader>
                <CardBody>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-primary">
                            {userDetails.nome} {userDetails.cognome}
                        </h1>
                        <Divider className="my-4" />
                        <div className="space-y-4">
                            <div className="flex items-center justify-center">
                                <FaUser className="mr-3 text-foreground" />
                                <span>{userDetails.nome} {userDetails.cognome}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <FaEnvelope className="mr-3 text-foreground" />
                                <span>{userDetails.email}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <FaBirthdayCake className="mr-3 text-foreground" />
                                <span>
                                    {calculateAge(userDetails.dataNascita)} anni
                                    ({new Date(userDetails.dataNascita).toLocaleDateString()})
                                </span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}