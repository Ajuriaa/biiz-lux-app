import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth';

const routes: Routes = [
  { path: '', title: 'Login!', component: LoginComponent },
  {
    path: 'customer',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  }

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
