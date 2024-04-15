import { Transaction } from '../models/transaction'

export interface TransactionRepository {
    getTransactions: () => Promise<Transaction[]>
}
