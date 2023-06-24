import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../core/enums';
import {
  HomeComponent
} from './containers';


const routes: Routes = [{
  path: '',
  data: { roles: [Role.customer] },
  children: [
    {
      path: 'home',
      title: 'Inicio',
      component: HomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
