import { Component, OnInit } from '@angular/core';

import { ServiceOneService } from "./service-one.service";
import { ServiceTwoService } from "./service-two.service";

export class StuffModel {
    id: number;
    name: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = "Hello";
    stuff = [];
    showPopup: boolean = false;
    error: string;

    constructor(
        private serviceOne: ServiceOneService,
        private serviceTwo: ServiceTwoService
    ) { }

    ngOnInit() {
        this.stuff = [{ id: 0, name: "smurf" }];
        //this.getStuff();
    }

    getStuff() {
        this.serviceTwo.getStuff()
            .subscribe(response => {
                this.stuff = response.body.map((name, index) => ({ id: index + 1, name: name }));
            },
                error => this.error = error
            );
    }

    requestClearStuff() {
        this.showPopup = true;
    }

    clearStuff() {
        this.stuff = [];
    }

    changeStuff(stuff: StuffModel) {
        stuff.name = this.serviceOne.modifyStuffName();
    }

    appOnConfirmedEmit(state: boolean) {
        this.showPopup = false;
        if (state) {
            this.clearStuff();
        }
    }

    /// some testing
    //data: StuffModel[];

    //test() {
    //    this.serviceTwo.getStuff()
    //        //.subscribe((data: string[]) => {
    //        //    this.data = data.map((name, index) => ({ id: index + 1, name: name }));
    //        //});
    //        .subscribe(response =>
    //        //const keys = response.headers.keys();
    //        //let headers = keys.map(key => `${key}: ${response.headers.get(key)}`);
    //        {
    //            this.data = response.body.map((name, index) => ({ id: index + 1, name: name }))
    //        },
    //            error => this.error = error
    //        );
    //}
}
