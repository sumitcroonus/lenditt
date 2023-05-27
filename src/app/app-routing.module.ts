import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'',
  component:ProductlistComponent},
  {path:'details/:id',
  component:ProductComponent},
  {path:'search/:query',
  component:SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
