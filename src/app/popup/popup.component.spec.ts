import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from "../../testing/utilities";

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
    let component: PopupComponent;
    let fixture: ComponentFixture<PopupComponent>;
    let cancelDe: DebugElement;
    let cancelEl: HTMLElement;
    let confirmDe: DebugElement;
    let confirmEl: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopupComponent);
        component = fixture.componentInstance;

        cancelDe = fixture.debugElement.query(By.css(".cancel"));
        cancelEl = cancelDe.nativeElement;
        confirmDe = fixture.debugElement.query(By.css(".confirm"));
        confirmEl = confirmDe.nativeElement;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should raise selected event when clicked (triggerEventHandler)", () => {
        let selectedState: boolean;
        component.confirmed.subscribe((state: boolean) => selectedState = state);

        cancelDe.triggerEventHandler("click", null);
        expect(selectedState).toBe(false);
    });

    it("should raise selected event when clicked (element.click)", () => {
        let selectedState: boolean;
        component.confirmed.subscribe((state: boolean) => selectedState = state);

        confirmEl.click();
        expect(selectedState).toBe(true);
    })
});

//////////////////////////////

describe("PopupComponent when inside a test host", () => {
    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let popupElCancelDe: DebugElement;
    let popupElCancel: HTMLElement;
    let popupElConfirm: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopupComponent, TestHostComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        fixture.detectChanges();

        popupElCancel = fixture.nativeElement.querySelector(".cancel");
        popupElConfirm = fixture.nativeElement.querySelector(".confirm");

    });

    it("should raise confirmed event when clicked (cancel)", () => {
        click(popupElCancel);
        expect(testHost.showPopup).toBe(false);
    });

    it("should raise confirmed event when clicked (confirm)", () => {
        click(popupElConfirm);
        expect(testHost.showPopup).toBe(false);
    });
});

import { Component } from "@angular/core";

@Component({
    template: `
        <app-popup *ngIf="showPopup"
           (confirmed)="appOnConfirmedEmit($event)">
        </app-popup>`
})
class TestHostComponent {
    showPopup: boolean = true;
    appOnConfirmedEmit(state: boolean) {
        this.showPopup = false;
    }
}
