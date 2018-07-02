import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent, StuffModel } from './app.component';
import { DebugElement } from '@angular/core';
import { ServiceOneService } from './service-one.service';
import { ServiceTwoService } from './service-two.service';
import { of, defer } from 'rxjs';

import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { map } from 'rxjs/operators';

export function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

describe("component", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let modifyStuffNameSpy: jasmine.Spy;
    let getStuffSpy: jasmine.Spy;
    let quoteEl: HTMLElement;
    let expectedStuff: any;
    let trs: HTMLElement[];
    let newName: string;

    beforeEach(() => {
        newName = "Potato";
        expectedStuff = { body: ["stuffOne", "stuffTwo"] } as any;

        // Create a fake TwainService object with a `getQuote()` spy
        const serviceOneService = jasmine.createSpyObj("ServiceOneService", ["modifyStuffName"]);
        const serviceTwoService = jasmine.createSpyObj('ServiceTwoService', ['getStuff']);
        // Make the spy return a synchronous Observable with the test data
        modifyStuffNameSpy = serviceOneService.modifyStuffName.and.returnValue(newName);
        getStuffSpy = serviceTwoService.getStuff.and.returnValue(of(expectedStuff));

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                { provide: ServiceOneService, useValue: serviceOneService },
                { provide: ServiceTwoService, useValue: serviceTwoService }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    describe("General stuff of App Component", () => {
        it('should create', () => {
            expect(component).toBeDefined();
        });

        it("should have as title 'Hello'", () => {
            expect(component.title).toEqual("Hello");
        });

        it("#clearStuff should remove stuff", () => {
            component.stuff = [
                { id: 1, name: "stuff 1" }
            ];
            component.clearStuff();
            expect(component.stuff.length).toBe(0);
        });

        it("#changeStuff should have service change name of stuff to 'Potato'", () => {
            fixture.detectChanges();
            //component.getStuff();
            component.changeStuff(component.stuff[0]);
            expect(component.stuff[0].name).toBe("Potato");
        });

        it("should have a <h1> with 'Hello'", () => {
            const testDe: DebugElement = fixture.debugElement;
            const testEl: HTMLElement = testDe.nativeElement;

            let h1 = testEl.querySelector("h1");
            fixture.detectChanges();
            expect(h1.textContent).toContain(component.title);
        });
    });

    describe('when test with synchronous observable', () => {
        it('should not show quote before OnInit', () => {
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(0, 'nothing displayed');
            expect(getStuffSpy.calls.any()).toBe(false, 'getStuff not yet called');
        });

        it("should have a value after init", () => {
            fixture.detectChanges();
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(1, 'nothing displayed');
        })

        it("should set stuff to two items", () => {
            component;
            fixture.detectChanges();
            component.getStuff();
            fixture.detectChanges();
            component;
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(2, '1 item displayed');
        })
    });

    describe("when test with asynchronous observable", () => {
        beforeEach(() => {
            getStuffSpy.and.returnValue(asyncData(expectedStuff));
        });

        it("should not show before OnInit", () => {
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(0, 'nothing displayed');
            expect(getStuffSpy.calls.any()).toBe(false, 'getStuff not yet called');
        });

        it('should still not show quote after component initialized', () => {
            fixture.detectChanges();
            // getQuote service is async => still has not returned with quote
            // so should show the start value, '...'
            component.stuff;

            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(1, 'nothing displayed');
            expect(getStuffSpy.calls.any()).toBe(false, 'getStuff called');
        });

        it("should show stuff after getStuff (fakeAsync)", fakeAsync(() => {
            fixture.detectChanges();
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(1, 'nothing displayed');
            component.getStuff();
            tick();
            fixture.detectChanges();
            component.stuff;
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(2, 'not updated');
            expect(getStuffSpy.calls.any()).toBe(true, 'getStuff called');
        }));

        it("should show stuff after getStuff (doneFn)", (done: DoneFn) => {
            fixture.detectChanges();
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(1, 'nothing displayed');
            component.getStuff();
            getStuffSpy.calls.mostRecent().returnValue.subscribe(() => {
                fixture.detectChanges();
                trs = fixture.nativeElement.querySelectorAll('li');
                expect(trs.length).toBe(2, 'not updated');
                expect(getStuffSpy.calls.any()).toBe(true, 'getStuff called');
                done();
            })
        })
        it("should show stuff after getStuff (async)", async(() => {
            fixture.detectChanges();
            trs = fixture.nativeElement.querySelectorAll('li');
            expect(trs.length).toBe(1, 'nothing displayed');
            component.getStuff();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(getStuffSpy.calls.any()).toBe(true, 'getStuff called');
                trs = fixture.nativeElement.querySelectorAll('li');
                expect(trs.length).toBe(2, 'one item displayed');
            });
        }));
    });
});

describe("AppComponent (marbles)", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let getStuffSpy: jasmine.Spy;
    let testStuff: any;
    let trs: HTMLElement[];

    beforeEach(() => {
        testStuff = { x: { body: ["foo", "bar"] } };
        const serviceTwoService = jasmine.createSpyObj("ServiceTwoService", ["getStuff"]);
        getStuffSpy = serviceTwoService.getStuff;

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                { provide: ServiceTwoService, useValue: serviceTwoService }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

    })

    it('should display error when ServiceTwoService fails', fakeAsync(() => {
        const q$ = cold('---x|', testStuff);
        q$.pipe(map((name, index) => ({ id: index + 1, name: name })))
        getStuffSpy.and.returnValue(q$);

        fixture.detectChanges(); // ngOnInit()
        trs = fixture.nativeElement.querySelectorAll('li');
        expect(trs.length).toBe(1, 'nothing displayed');

        component.getStuff();
        getTestScheduler().flush();
        tick();
        fixture.detectChanges();
        component.stuff;

        expect(getStuffSpy.calls.any()).toBe(true, 'getStuff called');
        trs = fixture.nativeElement.querySelectorAll('li');
        expect(trs.length).toBe(2, 'one item displayed');
    }));
})
