import { Http } from '@domain/repositories/Http'
import useSupabasePlugin from '@presenter/plugins/useSupabaseClient'

export const httpSupabase: Http = {
    get: async <T>(
        table: string,
        params?: Record<string, any>,
        config?: any
    ) => {
        const client = useSupabasePlugin().client
        const { data } = await client.from(table).select()
        return data
    },
    post: async <T>(
        path: string,
        params?: Record<string, any>,
        config?: any
    ) => {
        //const response = await transactionListMock
        //return response
    },
    put: async <T>(
        path: string,
        params?: Record<string, any>,
        config?: any
    ) => {},
    delete: async <T>(path: string, params?: any, config?: any) => {},
}
