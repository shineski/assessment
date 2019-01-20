import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/product-list/list.component';
import { DetailComponent } from './components/product-detail/detail.component';
import { FormComponent } from './components/product-form/form.component';


const routes: Routes = [
  { path: 'product/list', component: ListComponent },
  { path: 'product/detail', component: DetailComponent },
  { path: 'product/form', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
