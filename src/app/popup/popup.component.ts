import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

    @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    uiOnCancelClicked() {
        this.confirmed.emit(false);
    }

    uiOnConfirmClicked() {
        this.confirmed.emit(true);
    }
}
