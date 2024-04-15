import { TransactionRepository } from '../repositories/TransactionRepository'

export const transactionService = (
    repository: TransactionRepository
): TransactionRepository => ({
    getTransactions: () => {
        return repository.getTransactions()
    },
})
