import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {ProductsComponent} from './products/products.component';
import {ResponseComponent} from './response/response.component';
import {RequisitesComponent} from './requisites/requisites.component';
import {MultilinkComponent} from './multilink/multilink.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'BR.PARSING' },
  { path: 'contact', component: ContactComponent, title: 'Контакты' },
  { path: 'products', component: ProductsComponent, title: 'Продукты' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Политика конфиденциальности' },
  { path: 'response', component: ResponseComponent, title: 'Отклик' },
  { path: 'requisites', component: RequisitesComponent, title: 'Реквизиты' },
  { path: 'multilink', component: MultilinkComponent, title: 'Карта сайта' },
  { path: '**', redirectTo: '' }
];
