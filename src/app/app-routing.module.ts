import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeToGiftComponent } from './components/code-to-gift/code-to-gift.component';
import { HomeComponent } from './components/home/home.component';
import { ConnectionComponent } from './components/login/connection/connection.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import {AccountComponent} from "./components/account/account.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {ResetPasswordComponent} from "./components/account/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, children: [
      { path: '', redirectTo: 'connection', pathMatch: 'full' },
      { path: 'connection', component: ConnectionComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'code-to-gift', component: CodeToGiftComponent },
  { path: 'account', component: AccountComponent , children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
