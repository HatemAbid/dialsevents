import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
//import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitComponent } from './dashboard/produit/produit.component';
import { ProduitCreateComponent } from './dashboard/produit-create/produit-create.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DashboardComponent,
    ProduitComponent,
    ProduitCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
	  ReactiveFormsModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }