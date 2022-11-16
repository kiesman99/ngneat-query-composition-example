import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AllPermissionsPageComponent } from './pages/all-permissions-page/all-permissions-page.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    UserPageComponent,
    AllPermissionsPageComponent,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
