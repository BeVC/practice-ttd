import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ServiceOneService } from "./service-one.service";
import { ServiceTwoService } from "./service-two.service";

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { HighlightDirective } from './highlight.directive';


@NgModule({
    declarations: [
        AppComponent,
        PopupComponent,
        HighlightDirective
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
