import { authRepository } from '../di/moduleRepository'

export const useUserStore = defineStore('userStore', () => {
    const supabase = useSupabaseClient()
    const user = ref(null)
    const repository = authRepository
    const initUser = async () => {
        user.value = await repository.getUser()
    }
    initUser()
    const signIn = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
    }
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        user.value = null
    }
    return { user, signIn, signOut }
})
