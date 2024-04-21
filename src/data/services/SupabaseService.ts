import { createClient } from '@supabase/supabase-js'
export interface ISupabaseService {
    getData: <T>(table: string, columns?: string) => Promise<T>
}

export class SupabaseService implements ISupabaseService {
    supabase = createClient(
        'https://rmuqooblvjopkdvqdtvu.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdXFvb2JsdmpvcGtkdnFkdHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNTYyNjgsImV4cCI6MjAyODYzMjI2OH0.6eMux707N5OgVMZ78IMvTE3LHh4m7U6SQCtyhUYdhN4'
    )
    async getData<T>(table: string, columns?: string): Promise<T> {
        const { data, error } = await this.supabase.from(table).select(columns)
        if (error) throw error
        return data as T
    }
    getClient() {
        return this.supabase
    }
}
