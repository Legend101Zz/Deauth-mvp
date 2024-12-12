
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/app/loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/auth/login');
        }
    }, [status, router]);

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "authenticated") {
        return <>{children}</>;
    }

    // Return null while checking or redirecting
    return null;
};