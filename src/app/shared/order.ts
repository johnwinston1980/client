import { Product } from '../product/shared/product'
import { TSMap } from "typescript-map"
import * as _ from 'lodash'

export namespace Order {

    export class UserOrder {

        private static instance: UserOrder = new UserOrder();

        providerId?: string
        products?: TSMap<string, Product>

        private constructor() { }

        public static getInstance(): UserOrder {
            return this.instance
        }

        public setProviderId(id) {
            this.providerId = id
        }

        public getProviderId(): string {
            return this.providerId
        }

        public addProduct(product: Product) {
            if (_.isEmpty(this.getProviderId())) {
                this.setProviderId(product.providerId)
                this.products = new TSMap<string, Product>()
            }
            else if (this.getProviderId() != product.providerId) {
                this.products = new TSMap<string, Product>()
                this.setProviderId(product.providerId)
            }
            this.products.set(product.id, product)
        }

        public removeProduct(product: Product) {
            this.products.delete(product.id)
        }

        public isSelected(product: Product) {
            if (!_.isEmpty(this.products)) {
                return !_.isEmpty(this.products.get(product.id))
            }
            return false
        }

        public emptyProductList() {
            this.products.clear()
        }

        public getProducts(): TSMap<string, Product> {
            if (_.isEmpty(this.products)) {
                this.products = new TSMap<string, Product>()
            }
            return this.products
        }
    }
}