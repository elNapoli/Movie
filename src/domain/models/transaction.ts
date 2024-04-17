export interface ITransaction {
    fetchTransactions: () => Transaction
}

export class Transaction {
    id: string
    create_at: string
    amount: number
    type: string
    description: string
    category: string
    constructor(
        id: string,
        create_at: string,
        amount: number,
        type: string,
        description: string,
        category: string
    ) {
        this.id = id
        this.create_at = create_at
        this.amount = amount
        this.type = type
        this.description = description
        this.category = category
    }
}
