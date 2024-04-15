import { Transaction } from '../../domain/models/transaction'
import { TransactionRepository } from '../../domain/repositories/TransactionRepository'
import { Http } from '../../domain/repositories/Http'
import { TransactionDto } from '../../infrastructure/http/dto/TransactionDto'

export const transactionRepositoryImpl = (
    client: Http
): TransactionRepository => ({
    getTransactions: async () => {
        const transactions = await client.get<TransactionDto>('transactions')
        return transactions.map(
            (transactionDto): Transaction => ({
                id: transactionDto.id,
                create_at: transactionDto.create_at,
                amount: transactionDto.amount,
                type: transactionDto.type,
                description: transactionDto.description,
                category: transactionDto.category,
            })
        )
    },
})
