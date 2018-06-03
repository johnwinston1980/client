import {Address} from './address';

export interface Provider{
  id?:string 
  userId?: string	
  name?: string
  image?: string
  address?: Address  
  distance?: string
  description?: string
  rating?: number
  reviews?: number
}