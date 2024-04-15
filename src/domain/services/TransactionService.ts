import { TransactionRepository } from '../repositories/TransactionRepository'

// Here we can change the repository by one that implement the IProductRepository interface
//const repository: IProductRepository = ;

export const productService = (
    repository: TransactionRepository
): TransactionRepository => ({
    getTransactions: () => {
        return repository.getTransactions()
    },
})
