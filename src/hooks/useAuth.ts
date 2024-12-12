// src/hooks/useAuth.ts
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = (requireAuth: boolean = true) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !session) {
      router.push("/auth/login");
    }
  }, [session, loading, requireAuth, router]);

  return {
    user: session?.user,
    loading,
    isAuthenticated: !!session,
  };
};
