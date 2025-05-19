import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
import React from "react";
import {authOptions} from "@/app/lib/auth";

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/signin');
    }

    return <>{children}</>;
}
