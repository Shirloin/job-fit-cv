import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useCurrentSession = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [status, setStatus] = useState<string>("unauthenticated")

    const pathname = usePathname()
    const retrieveSession = useCallback(async () => {
        try {
            setStatus("loading");
            const sessionData = await getSession();

            if (sessionData) {
                setSession(sessionData);
                setStatus("authenticated");
                return;
            }

            setStatus("unauthenticated");
        } catch (error) {
            setStatus("unauthenticated");
            setSession(null);
        }
    }, []);

    useEffect(() => {
        retrieveSession();

    }, [retrieveSession, pathname]);
    return { session, status };
};