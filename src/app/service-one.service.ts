import { Injectable } from '@angular/core';
import { StuffModel } from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class ServiceOneService {

    constructor() { }

    //modifyStuffName(stuff: StuffModel): StuffModel {
    //    stuff.name = "Potato";
    //    return stuff;
    //}

    //modifyStuffName(stuff: StuffModel) {
    //    stuff.name = "Potato";
    //}

    modifyStuffName(): string {
        return "tater";
    }
}
