import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServiceTwoService } from './service-two.service';
import { expand } from 'rxjs/operators';

//import { StuffModel } from "./app.component";

describe('ServiceTwoService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let serviceTwoService: ServiceTwoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [HttpClientTestingModule],
            // Provide the service-under-test and its dependencies
            providers: [
                ServiceTwoService
            ]
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        serviceTwoService = TestBed.get(ServiceTwoService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    describe("#getStuff", () => {
        let expectedStuff: string[];

        beforeEach(() => {
            //serviceTwoService = TestBed.get(ServiceTwoService);
            expectedStuff = ["stuffOne", "stuffTwo"] as string[];
        });

        it("should return expected stuff (called once)", () => {
            serviceTwoService.getStuff().subscribe(
                stuff => expect(stuff.body).toEqual(expectedStuff, "should return expected stuff"), fail);

            // ServiceTwoService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne(serviceTwoService.configUrl);
            expect(req.request.method).toEqual("GET");

            // respond with mock stuff
            req.flush(expectedStuff);
        });

        it("should be OK returning no stuff", () => {
            serviceTwoService.getStuff().subscribe(
                stuff => expect(stuff.body.length).toEqual(0, "should have empty stuff array"), fail);

            const req = httpTestingController.expectOne(serviceTwoService.configUrl);
            // respond with no stuff
            req.flush([]);
        });

        it('should return expected stuff (called multiple times)', () => {

            serviceTwoService.getStuff().subscribe(
                stuff => expect(stuff.body.length).toEqual(0, "should have empty stuff array"), fail
            );
            serviceTwoService.getStuff().subscribe(
                stuff => expect(stuff.body[0]).toEqual("potato", "should return one item"), fail
            );
            serviceTwoService.getStuff().subscribe(
                stuff => expect(stuff.body).toEqual(expectedStuff, 'should return expected stuff'),
                fail
            );

            const requests = httpTestingController.match(serviceTwoService.configUrl);
            expect(requests.length).toEqual(3, 'calls to getStuff()');

            // Respond to each request with different mock hero results
            requests[0].flush([]);
            requests[1].flush(["potato"]);
            requests[2].flush(expectedStuff);
        });

        // this service reports the error
        // NEED TO STUDY THIS ONE A BIT FURTHER
        //it("should return 404", () => {
        //    serviceTwoService.getStuff().subscribe(
        //        stuff => {
        //            expect(stuff.statusText).toEqual("Not found", "should return error message"), fail
        //        });

        //    const req = httpTestingController.expectOne(serviceTwoService.configUrl);

        //    //respond with a 404 and the error message in the body
        //    const msg = "deliberate 404 error";
        //    req.flush(msg, { status: 404, statusText: "Not found" });
        //});
    });
});
