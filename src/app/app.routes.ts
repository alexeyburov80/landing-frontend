import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {ProductsComponent} from './products/products.component';
import {ResponseComponent} from './response/response.component';
import {RequisitesComponent} from './requisites/requisites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'BR.PARSING' },
  { path: 'contact', component: ContactComponent, title: 'Контакты' },
  { path: 'products', component: ProductsComponent, title: 'Продукты' },
  // { path: 'thanks', component: ThanksComponent },
  { path: 'response', component: ResponseComponent, title: 'Отклик' },
  { path: 'requisites', component: RequisitesComponent, title: 'Реквизиты' },
  { path: '**', redirectTo: '' }
];
