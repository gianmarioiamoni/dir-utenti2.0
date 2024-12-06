"use client"

import { FC } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
import { User } from "@/interfaces/userInterfaces";

interface UserBreadcrumbsProps {
    userDetails: User;
}
const UserBreadcrumbs: FC<UserBreadcrumbsProps> = ({userDetails}) => {
    return (
        <div className="mb-4">
            <Breadcrumbs>
                <BreadcrumbItem href="/home" className="hover:primary">Home</BreadcrumbItem>
                <BreadcrumbItem href="/users" className="hover:primary">Utenti</BreadcrumbItem>
                <BreadcrumbItem>{userDetails.nome} {userDetails.cognome}</BreadcrumbItem>
            </Breadcrumbs>
        </div>
        // <nav className="mb-4">
        //     <ol className="list-reset flex text-sm text-gray-600">
        //         <li>
        //             <Link href="/" className="hover:primary">Home</Link>
        //             <span className="mx-2">/</span>
        //         </li>
        //         <li>
        //             <Link href="/users" className="hover:primary">Users</Link>
        //             <span className="mx-2">/</span>
        //         </li>
        //         <li className="text-foreground font-semibold">{userDetails.nome} {userDetails.cognome}</li>
        //     </ol>
        // </nav>
    );
};

export default UserBreadcrumbs;
