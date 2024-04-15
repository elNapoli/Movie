import { Product } from './product'

// This interface define what operations we can perform on a Cart
export interface ICart {
    createCart: () => Cart
    addProductToCart: (cart: Cart, product: Product) => Cart
    removeProductFromCart: (cart: Cart, product: Product) => Cart
}

export class Cart {
    id: string
    products: Product[]
    constructor(id: string, products: Product[]) {
        this.id = id
        this.products = products
    }
}
