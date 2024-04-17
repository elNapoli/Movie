export default function useSupabasePlugin() {
    const client = useSupabaseClient()
    // Aquí puedes hacer cualquier configuración o lógica adicional utilizando el cliente de Supabase

    return { client }
}
