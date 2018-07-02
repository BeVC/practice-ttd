import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { StuffModel } from "./app.component";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ServiceTwoService {
    configUrl = 'assets/assets.json';

    constructor(private http: HttpClient) { }

    // alt version
    //getStuffAlt(): Observable<string[]> {
    //    return this.http.get<string[]>(this.configUrl)
    //        .pipe(
    //            catchError(this.handleError)
    //        );
    //}

    // version we really want
    getStuff(): Observable<HttpResponse<string[]>> {
        return this.http.get<string[]>(this.configUrl, { observe: "response" })
            .pipe(
                catchError(this.handleError)
            );

    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error("An error occured: ", error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`)
        }

        return throwError(
            "Something bad happened: please try again later.");
    }
}
