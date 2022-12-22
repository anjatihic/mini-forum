import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {ForumPageComponent} from "./forum-page/forum-page.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth.guard";
import {User} from "./models/user.model";

const routes: Route[] = [
  {path: '', component: ForumPageComponent, canActivate: [AuthGuard]},
  {path: 'login', loadChildren: () => AuthModule},
  {path: 'profile', component: ProfileComponent, data: User}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
