import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home/vendor-home.component';
import { ProductHomeComponent } from '@app/product/product-home/product-home.component';
import { GeneratorComponent } from './purchaseorder/generator/generator.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Exercises - Home' },
  {
    path: 'vendors',
    component: VendorHomeComponent,
    title: 'Exercises - Vendors',
  },
  {
    path: 'products',
    component: ProductHomeComponent,
    title: 'Products',
  },
  { path: '', component: HomeComponent, title: 'Exercises - Home' },
  { path: 'purchaseorders', component: GeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
