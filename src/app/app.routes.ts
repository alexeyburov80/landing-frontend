import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {ProductsComponent} from './products/products.component';
import {ThanksComponent} from './thanks/thanks.component';
import {ResponseComponent} from './response/response.component';
import {RequisitesComponent} from './requisites/requisites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  // { path: 'thanks', component: ThanksComponent },
  { path: 'response', component: ResponseComponent },
  { path: 'requisites', component: RequisitesComponent },
  { path: '**', redirectTo: '' }
];
