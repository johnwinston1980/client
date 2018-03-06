import { Product } from '../../product/shared/product'

export interface OrderFirestore{
    id?: string,
    userId?: string,
    providerId?: string,    
    status?: string,
    products?: Array<Product>
}