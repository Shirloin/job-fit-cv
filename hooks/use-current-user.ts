import { useCurrentSession } from "./use-current-session"

export const useCurrentUser = () => {
    const { session } = useCurrentSession()
    return session?.user
}