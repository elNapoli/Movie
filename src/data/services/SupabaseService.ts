import { getSupabaseClient } from '~/utils/formattedDate'
export interface ISupabaseService {
    getData: <T>(table: string, columns?: string) => Promise<T>
}

export class SupabaseService implements ISupabaseService {
    supabase = getSupabaseClient()
    async getData<T>(table: string, columns?: string): Promise<T> {
        const { data, error } = await this.supabase.from(table).select(columns)
        if (error) throw error
        return data as T
    }
}
