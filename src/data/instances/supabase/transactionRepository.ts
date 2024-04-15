import { TransactionRepository } from '../../../domain/repositories/TransactionRepository'
import { Http } from '../../../domain/repositories/Http'
import { httpSupabase } from '../../../data/instances/supabase/HttpSupabase'
import { transactionRepositoryImpl } from '../../../data/repositories/transactionRepositoryImpl'

const client: Http = httpSupabase

export const transactionRepository: TransactionRepository =
    transactionRepositoryImpl(client)
