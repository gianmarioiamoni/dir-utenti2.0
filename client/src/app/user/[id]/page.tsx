'use client';

import { Suspense } from 'react';
import { getUserDetails } from '@/services/userServices';
import UserDetailsContent from './UserDetailsContent';

export const dynamic = 'force-dynamic';

export default async function Page({
    params,
}: {
    params: { id: string };
}) {
    const user = await getUserDetails(params.id);
    const userDetails = {
        ...user,
        dataNascita: user.dataNascita.toISOString()
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserDetailsContent userDetails={userDetails} />
        </Suspense>
    );
}