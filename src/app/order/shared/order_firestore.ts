import { Product } from '../../product/shared/product'

export interface OrderFirestore{
    id?: string,
    userId?: string,
    providerId?: string,  
    providerName?: string,  
    providerImage?: string,
    status?: string,
    pickupTime?: string,
    createdDate?: Date,
    remarks?: string,
    products?: Array<Product>,
    paid: boolean
}