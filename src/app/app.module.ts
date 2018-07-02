import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ServiceOneService } from "./service-one.service";
import { ServiceTwoService } from "./service-two.service";

import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        ServiceOneService,
        ServiceTwoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
