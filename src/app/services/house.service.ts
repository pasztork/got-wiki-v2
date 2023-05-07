import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { House } from "../models/house.type";

/**
 * A service for retrieving data about houses from the "An API of Ice and Fire" API.
 */
@Injectable()
export class HouseService {
    /**
     * The endpoint URL of the API for retrieving data about houses.
     */
    readonly endpoint: string = 'https://www.anapioficeandfire.com/api/houses';

    /**
     * The number of houses to show on one page.
     */
    readonly pageSize: number = 5;

    /**
     * Creates a new instance of the `HouseService` class.
     * @param http The `HttpClient` service for making HTTP requests.
     */
    constructor(private http: HttpClient) { }

    /**
     * Retrieves a page of houses from the API.
     * @param pageNumber The number of the page to retrieve.
     * @returns An `Observable` that emits an array of `House` objects.
     */
    getHouses(pageNumber: number): Observable<House[]> {
        const params = {
            page: pageNumber,
            pageSize: this.pageSize
        };
        return this.http.get<House[]>(this.endpoint, { params });
    }

    /**
     * Retrieves a single house from the API.
     * @param url The URL of the house to retrieve.
     * @returns An `Observable` that emits a `House` object.
     */
    getHouse(url: string): Observable<House> {
        return this.http.get<House>(url);
    }

    /**
     * Retrieves houses from the API by name.
     * @param name The name of the house to retrieve.
     * @returns An `Observable` that emits an array of `House` objects.
     */
    getHouseByName(name: string): Observable<House[]> {
        const params = {
            name: name
        };
        return this.http.get<House[]>(this.endpoint, { params });
    }
}
