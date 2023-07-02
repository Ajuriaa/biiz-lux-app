import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../core/enums';
import {
  ExperiencesComponent,
  ForgotSomethingComponent,
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
    },
    {
      path: 'experiences',
      title: 'Experiencias',
      component: ExperiencesComponent
    },
    {
      path: 'forgot-something',
      title: 'Olvide Algo',
      component: ForgotSomethingComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengersRoutingModule { }
