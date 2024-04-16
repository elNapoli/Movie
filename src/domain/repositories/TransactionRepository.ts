import { Transaction } from '@domain/models/transaction'

export interface TransactionRepository {
    getTransactions: () => Promise<Transaction[]>
}
