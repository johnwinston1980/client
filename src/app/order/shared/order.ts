import { Product } from '../../product/shared/product'
//import { Category } from '../../category/shared/category'
import { TSMap } from "typescript-map"
import { MenuItem } from '../../menu/shared/menu-item'

export interface Order{
    id?: string,
    providerId?: string,    
    products?: TSMap<string, Product>
}