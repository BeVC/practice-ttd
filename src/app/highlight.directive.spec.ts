import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

@Component({
    template: `
  <h2 highlight="yellow">Something Yellow</h2>
  <h2 highlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>
  <input #box [highlight]="box.value" value="cyan"/>`
})
class TestComponent { }

describe("HighlightDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[]; // the three elements with the directive
    let bareH2: DebugElement; // the <h2> w/o the directive

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [HighlightDirective, TestComponent]
        })
            .createComponent(TestComponent);

        fixture.detectChanges();

        // all elements with an attached HighlightDirective
        des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

        // the h2 without the HighlightDirective
        bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
    });

    it("should have three highlighted elements", () => {
        expect(des.length).toBe(3);
    })
})


//describe('HighlightDirective', () => {
//  it('should create an instance', () => {
//    const directive = new HighlightDirective();
//    expect(directive).toBeTruthy();
//  });
//});
