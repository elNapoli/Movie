export default defineNuxtPlugin((app) => {
    const client = useSupabaseClient()

    return { client }
})
