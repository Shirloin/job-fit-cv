import { UserService } from "@/services/UserService"
import { TCV } from "@/types/cv"
import { TUser } from "@/types/user"
import { JsonObject } from "@prisma/client/runtime/library"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCurrentUser } from "./use-current-user"

export const useSaveCV = () => {
    const queryClient = useQueryClient()
    const user = useCurrentUser()
    const saveCV = async ({ cv }: { cv: JsonObject }) => {
        try {
            const response = await UserService.saveUserCV(user.id, cv)
            return response.data as TCV
        } catch (error) {
            throw new Error("Fail to save user cv")
        }
    }
    return useMutation({
        mutationKey: ['savecv'],
        mutationFn: saveCV,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] })
            queryClient.invalidateQueries({ queryKey: ["cv"] })
        }
    })
}