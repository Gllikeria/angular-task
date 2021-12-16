import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoaderComponent } from './loader/loader.component';
const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'loader', component: LoaderComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
