import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main/main.component'
import { ListProvidersComponent } from './provider/list-providers/list-providers.component'
import { ListCategoriesComponent } from './category/list-categories/list-categories.component'
import { ListProductsComponent } from './product/list-products/list-products.component'
import { DetailsProductComponent } from './product/details-product/details-product.component'
import { OrderComponent } from './order/order/order.component'
import { ListOrdersComponent } from './order/list-orders/list-orders.component'
import { ListOrdersProviderComponent } from './order/list-orders-provider/list-orders-provider.component'
import { MenuComponent } from './menu/menu/menu.component'
import { ContentProviderComponent } from './provider/content-provider/content-provider.component'
import { PasswordlessAuthComponent } from './main/passwordless-auth/passwordless-auth.component'

const routes: Routes = [
  { path: 'login', component: PasswordlessAuthComponent },
  { path: '', component: MainComponent },
  { path: 'content/:provId', component: ContentProviderComponent },
  { path: 'menu/:provId', component: MenuComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'list-orders', component: ListOrdersComponent },
  { path: 'list-orders-provider/:provId', component: ListOrdersProviderComponent },
  { path: 'list-categories/:provId', component: ListCategoriesComponent },
  { path: 'list-products/:provId/:catId', component: ListProductsComponent },
  { path: 'details-product', component: DetailsProductComponent },
  { path: 'list-providers', component: ListProvidersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }