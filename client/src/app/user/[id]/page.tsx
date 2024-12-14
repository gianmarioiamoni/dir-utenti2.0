import { Suspense } from 'react';
import { getUserDetails } from '@/services/userServices';
import UserDetailsContent from './UserDetailsContent';
import { User } from '@/interfaces/userInterfaces';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const userData = await getUserDetails(id);

    // Assicuriamoci che dataNascita sia nel formato corretto per il componente
    const userDetails = {
        ...userData,
        dataNascita: userData.dataNascita instanceof Date 
            ? userData.dataNascita.toISOString().split('T')[0]
            : String(userData.dataNascita).split('T')[0]
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserDetailsContent userDetails={userDetails} />
        </Suspense>
    );
}