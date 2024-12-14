'use client';

import { Suspense } from 'react';
import { getUserDetails } from '@/services/userServices';
import UserDetailsContent from './UserDetailsContent';

export const dynamic = 'force-dynamic';

export default function Page({
    params,
}: {
    params: { id: string };
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserDetailsWrapper id={params.id} />
        </Suspense>
    );
}

async function UserDetailsWrapper({ id }: { id: string }) {
    const user = await getUserDetails(id);
    const userDetails = {
        ...user,
        dataNascita: user.dataNascita.toISOString()
    };
    return <UserDetailsContent userDetails={userDetails} />;
}