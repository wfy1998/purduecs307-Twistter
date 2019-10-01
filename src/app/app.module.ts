import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { MainComponent } from './common/main/main.component';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ReactiveFormsModule } from '@angular/forms';
import {FindPasswordComponent} from './findPassword/findPassword.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    FindPasswordComponent,
    ProfileComponent,
    // DataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}

