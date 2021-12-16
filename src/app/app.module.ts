import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SingleUserComponent } from './user-page/single-user/single-user.component';
import { UserFriendsComponent } from './user-page/user-friends/user-friends.component';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserPageComponent,
    SingleUserComponent,
    UserFriendsComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
