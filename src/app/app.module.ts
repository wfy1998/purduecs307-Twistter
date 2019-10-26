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

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {OtherService} from './other.service';
import {ReactiveFormsModule } from '@angular/forms';
import {FindPasswordComponent} from './findPassword/findPassword.component';
import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import {CookieService} from 'angular2-cookie/core';
import {AuthInterceptor} from './auth-interceptor';



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
    TimelineComponent,
    // DataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, OtherService, CookieService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }],
  bootstrap: [AppComponent]
})
export class AppModule {}

