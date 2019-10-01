import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {MainComponent} from './common/main/main.component';
import {FindPasswordComponent} from './findPassword/findPassword.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: '', component: MainComponent},

  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'register', component: RegisterComponent
  },

  {
    path: 'findPassword', component: FindPasswordComponent
  },
  {
    path: 'profile', component: ProfileComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
