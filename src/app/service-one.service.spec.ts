import { TestBed, inject } from '@angular/core/testing';

import { ServiceOneService } from './service-one.service';

import { StuffModel } from "./app.component";

describe('ServiceOneService', () => {
    let service: ServiceOneService;
    beforeEach(() => { service = new ServiceOneService() });
    //beforeEach(() => {
    //  TestBed.configureTestingModule({
    //    providers: [ServiceOneService]
    //  });
    //});

    //it('should be created', inject([ServiceOneService], (service: ServiceOneService) => {
    //  expect(service).toBeTruthy();
    //}));

    //it("#modifyStuffName should return an object with name is 'Potato'", () => {
    //    let stuff = { id: 1, name: "stuff" };
    //    expect(service.modifyStuffName(stuff).name).toBe("Potato");
    //});

    //it("#modifyStuffName should set object name to 'Potato'", () => {
    //    let stuff = { id: 1, name: "stuff" };
    //    service.modifyStuffName(stuff);
    //    expect(stuff.name).toBe("Potato");
    //});

    it("#modifyStuffName should set object name to 'Potato'", () => {
        let stuff = { id: 1, name: "stuff" };
        stuff.name = service.modifyStuffName();
        expect(stuff.name).toBe("tater");
    });
});
