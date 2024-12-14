import { Suspense } from 'react';
import { getUserDetails } from '@/services/userServices';
import UserDetailsContent from './UserDetailsContent';

export const dynamic = 'force-dynamic';

type PageParams = { id: string };

export default async function Page({
    params,
}: {
    params: PageParams;
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