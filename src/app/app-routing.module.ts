import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth';
import { ProfileComponent } from './shared/profile/components';
import { CustomerServiceComponent } from './shared/customer-service/';
import { FaqComponent } from './shared/faq';
import { ForgotSomethingComponent } from './passengers';

const routes: Routes = [
  { path: '', title: 'Login!', component: LoginComponent },
  {
    path: 'customer',
    loadChildren: () => import('./passengers/passengers.module').then(m => m.PassengersModule)
  },
  { path: 'profile', title: 'Perfil', component: ProfileComponent }
  ,
  { path: 'customer-service', title: 'Servicio al cliente', component: CustomerServiceComponent }
  ,
  { path: 'faq', title: 'Preguntas frecuentes', component: FaqComponent }
  ,
  { path: 'forgot-something', component: ForgotSomethingComponent }



  // Errors routes
  // { path: 'error', title: 'Error', component: NotFoundErrorComponent },
  // { path: 'not-allowed',  title: 'No permitido', component: NotAllowedErrorComponent },
  // { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
