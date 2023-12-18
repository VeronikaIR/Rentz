import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverviewPageComponent} from './overview/components/overview-page/overview-page.component';
import {LoginComponent} from "./side-bar/components/login/login.component";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthService} from "./side-bar/service/auth.service";
import {AuthInterceptor} from "./side-bar/interceptors/auth.interceptor";
import { ShoppingCardComponent } from './shared/components/shopping-card/shopping-card.component';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { CreateItemComponent } from './side-bar/components/create-item/create-item.component';
import {RegisterUserComponent} from "./side-bar/components/register-user/register-user.component";

@NgModule({
  declarations: [
    AppComponent,
    OverviewPageComponent,
    LoginComponent,
    ShoppingCardComponent,
    CreateItemComponent,
    RegisterUserComponent
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
        AngularFireAuthModule,
        FormsModule,
        BsDatepickerModule.forRoot()
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
