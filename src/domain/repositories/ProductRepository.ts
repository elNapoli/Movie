import { Product } from '../models/product'

export interface ProductRepository {
    getProducts: () => Promise<Product[]>
    getProductsById: (id: string) => Promise<Product[]>
}
