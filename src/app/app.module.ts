import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeToGiftComponent } from './components/code-to-gift/code-to-gift.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { ConnectionComponent } from './components/login/connection/connection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeToGiftComponent,
    LoginComponent,
    RegisterComponent,
    ConnectionComponent,
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    AccountComponent,
    ProfileComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    ToggleButtonModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
