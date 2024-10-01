import { useSession } from 'next-auth/react'
import { TUser } from "@/types/user";

export const useCurrentUser = () => {
    const { data: session } = useSession();
    return session?.user as TUser;
};
