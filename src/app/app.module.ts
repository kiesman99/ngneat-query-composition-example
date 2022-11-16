import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AllPermissionsPageComponent } from './pages/all-permissions-page/all-permissions-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UserTwoPageComponent } from './pages/user-two-page/user-two-page.component';
import { UserThreePageComponent } from './pages/user-three-page/user-three-page.component';

const routes: Routes = [
  {
    path: 'permissions',
    component: AllPermissionsPageComponent,
  },
  {
    path: 'user1',
    component: UserPageComponent,
  },
  {
    path: 'user2',
    component: UserTwoPageComponent,
  },
  {
    path: 'user3',
    component: UserThreePageComponent,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    UserPageComponent,
    AllPermissionsPageComponent,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
