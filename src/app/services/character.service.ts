import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Character } from "../models/character.type";

/**
 * A service that provides access to character data from the "An API of Ice and Fire" API.
 */
@Injectable()
export class CharacterService {
    /**
     * The API endpoint for character data.
     */
    readonly endpoint: string = 'https://www.anapioficeandfire.com/api/characters';

    /**
     * The number of characters to retrieve on a single page.
     */
    readonly pageSize: number = 5;

    /**
     * Constructs a new instance of the CharacterService class.
     * @param http The HttpClient service used to make HTTP requests.
     */
    constructor(private http: HttpClient) { }

    /**
     * Retrieves a page of character data from the API.
     * @param pageNumber The page number to retrieve.
     * @returns An Observable that emits an array of Character objects representing the requested page.
     */
    getCharacters(pageNumber: number): Observable<Character[]> {
        const params = {
            page: pageNumber,
            pageSize: this.pageSize
        };
        return this.http.get<Character[]>(this.endpoint, { params });
    }

    /**
     * Retrieves a single character's data from the API.
     * @param url The URL of the character to retrieve.
     * @returns An Observable that emits a Character object representing the requested character.
     */
    getCharacter(url: string): Observable<Character> {
        return this.http.get<Character>(url);
    }

    /**
     * Searches for characters by name.
     * @param name The name of the character to search for.
     * @returns An Observable that emits an array of Character objects matching the search query.
     */
    getCharacterByName(name: string): Observable<Character[]> {
        const params = {
            name: name
        };
        return this.http.get<Character[]>(this.endpoint, { params });
    }
}
