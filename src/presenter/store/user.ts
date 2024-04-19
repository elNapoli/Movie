export const useUserStore = defineStore('userStore', () => {
    const supabase = useSupabaseClient()
    const user = ref(null)
    const initUser = async () => {
        const { data } = await supabase.auth.getUser()
        user.value = data.user
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
