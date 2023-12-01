import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverviewPageComponent} from './overview/overview-page/overview-page.component';
import {LoginComponent} from "./login/login/login.component";
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {NgOptimizedImage} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./login/service/auth.service";
import {AuthInterceptor} from "./login/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    OverviewPageComponent,
    LoginComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule

  ],
  providers: [MatDatepickerModule, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
