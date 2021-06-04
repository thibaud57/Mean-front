import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccountComponent } from './body/account/account.component';
import { UsersComponent } from './body/users/users.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path: '', component: UsersComponent, canActivate:[AuthGuardService]},
  {path: 'account', component: AccountComponent, canActivate:[AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
