import { Product } from '../../product/shared/product'

export interface OrderFirestore{
    id?: string,
    userId?: string,
    providerId?: string,  
    providerName?: string,  
    status?: string,
    products?: Array<Product>
}