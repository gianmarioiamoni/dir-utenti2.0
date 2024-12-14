import { Suspense } from 'react';
import { getUserDetails } from '@/services/userServices';
import UserDetailsContent from './UserDetailsContent';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const userData = await getUserDetails(id);
    
    // Assicuriamoci che dataNascita sia una data valida
    const userDetails = {
        ...userData,
        dataNascita: typeof userData.dataNascita === 'string' 
            ? userData.dataNascita 
            : new Date(userData.dataNascita).toISOString()
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserDetailsContent userDetails={userDetails} />
        </Suspense>
    );
}