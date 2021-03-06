import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module'

import { AgmCoreModule } from '@agm/core';

import {MatDialogModule} from '@angular/material';


import {AngularFirestore} from 'angularfire2/firestore';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment.prod';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { Order } from '../app/shared/order'


import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { ListProvidersComponent } from './provider/list-providers/list-providers.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { DetailsProductComponent } from './product/details-product/details-product.component';

import { BroadcastObjectService } from './shared/broadcast-object.service';
import { OrderComponent } from './order/order/order.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { ListOrdersComponent } from './order/list-orders/list-orders.component';
import { MenuComponent } from './menu/menu/menu.component'

import { CategoryService } from './category/shared/category.service'
import { ProductService } from './product/shared/product.service';
import { OrdersUserService } from './order/shared/orders-user.service'

import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component'

import { ServiceWorkerModule } from '@angular/service-worker';
import { DetailsProviderComponent } from './provider/details-provider/details-provider.component';
import { ContentProviderComponent } from './provider/content-provider/content-provider.component';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ListOrdersProviderComponent } from './order/list-orders-provider/list-orders-provider.component';
import { OrderDialogComponent } from './dialogs/order-dialog/order-dialog.component'

import { QRCodeModule } from 'ng-qrcode';
import {RatingModule} from "ngx-rating";

import { HttpClientModule } from '@angular/common/http';
import { StarService } from './shared/star.service';
import { ProviderService } from './provider/shared/provider.service';
import { PasswordlessAuthComponent } from './main/passwordless-auth/passwordless-auth.component'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListProvidersComponent,
    NavbarComponent,
    ListProductsComponent,
    ListCategoriesComponent,
    DetailsProductComponent,
    OrderComponent,
    ListOrdersComponent,
    MenuComponent,
    LoginDialogComponent,
    MessageDialogComponent,
    DetailsProviderComponent,
    ContentProviderComponent,
    ListOrdersProviderComponent,    
    OrderDialogComponent, PasswordlessAuthComponent,    
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD_TkIqjNZTh2o0KmV10tQ7G1tIPCrdEU4",
      libraries: ["places"]
    }),    
    AngularFireDatabaseModule,
    AngularFireAuthModule,  
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,  
    AmazingTimePickerModule,
    QRCodeModule,
    HttpClientModule,
    RatingModule,
  ],
  entryComponents: [ LoginDialogComponent, MessageDialogComponent, OrderDialogComponent ],
  providers: [ BroadcastObjectService, CategoryService, ProductService, OrdersUserService, StarService, ProviderService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class AppModule { }
