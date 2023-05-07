import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Book } from "../models/book.type";

/**
 * A service that provides access to book data from the "An API of Ice and Fire" API.
 */
@Injectable()
export class BookService {
    /**
     * The URL of the API endpoint for books.
     */
    private readonly endpoint: string = 'https://www.anapioficeandfire.com/api/books';

    /**
     * The number of books shown on one page.
     */
    readonly pageSize: number = 5;

    /**
     * Constructs a new instance of the BookService.
     * @param http The HttpClient used for making HTTP requests.
     */
    constructor(private http: HttpClient) { }

    /**
     * Gets a page of books based on the specified page number.
     * @param pageNumber The page number of books to retrieve.
     * @returns An Observable of the array of books.
     */
    getBooks(pageNumber: number): Observable<Book[]> {
        const params = {
            page: pageNumber,
            pageSize: this.pageSize
        };
        return this.http.get<Book[]>(this.endpoint, { params });
    }

    /**
     * Gets a book by its URL.
     * @param url The URL of the book to retrieve.
     * @returns An Observable of the book.
     */
    getBook(url: string): Observable<Book> {
        return this.http.get<Book>(url);
    }

    /**
     * Gets an array of books by name.
     * @param name The name of the books to retrieve.
     * @returns An Observable of the array of books.
     */
    getBookByName(name: string): Observable<Book[]> {
        const params = {
            name: name
        };
        return this.http.get<Book[]>(this.endpoint, { params });
    }
}