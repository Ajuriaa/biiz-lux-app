import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToasterModule } from '../shared';
import { MaterialModule } from '../material';
import { LoginComponent } from './containers';
import { AuthMutations } from './services';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ToasterModule
  ],
  providers: [AuthMutations]
})
export class AuthModule {}
