import { TransactionRepository } from '../../../domain/repositories/TransactionRepository'
import { Http } from '../../../domain/repositories/Http'
import { httpSupabase } from '../../../infrastructure/instances/supabase/HttpSupabase'
import { transactionRepositoryImpl } from '../../../infrastructure/repositories/transactionRepositoryImpl'

const client: Http = httpSupabase

export const transactionRepository: TransactionRepository =
    transactionRepositoryImpl(client)
