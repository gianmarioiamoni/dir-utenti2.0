"use client"

import { FC } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { User } from "@/interfaces/userInterfaces";

interface UserBreadcrumbsProps {
    userDetails: User;
}
const UserBreadcrumbs: FC<UserBreadcrumbsProps> = ({ userDetails }) => {
    
    return (
        <div className="mb-4">
            <Breadcrumbs>
                <BreadcrumbItem href="/" className="hover:primary">Home</BreadcrumbItem>
                <BreadcrumbItem href="/users" className="hover:primary">Utenti</BreadcrumbItem>
                <BreadcrumbItem>{userDetails.nome} {userDetails.cognome}</BreadcrumbItem>
            </Breadcrumbs>
        </div>
    );
};

export default UserBreadcrumbs;
