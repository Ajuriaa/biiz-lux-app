import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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
    ToasterModule,
    IonicModule
  ],
  providers: [AuthMutations]
})
export class AuthModule {}
