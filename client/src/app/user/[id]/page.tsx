'use client';

import { Suspense } from 'react';
import { getUserDetails } from '@/services/userServices';
import UserDetailsContent from './UserDetailsContent';

type Props = {
    params: { id: string }
}

async function UserDetailsPage({ params }: Props) {
    const { id } = params;
    const userDetails = await getUserDetails(id);
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserDetailsContent userDetails={userDetails} />
        </Suspense>
    );
}

export default UserDetailsPage;