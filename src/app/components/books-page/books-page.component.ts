import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "src/app/models/book.type";
import { BookService } from "src/app/services/book.service";

/**
 * Component for a books list view.
 */
@Component({
    selector: 'books-page',
    templateUrl: './books-page.component.html',
    styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {
    /**
     * Array of shown books.
     */
    booksOnCurrentPage: Book[] = [];

    /**
     * Array of books on previous page.
     */
    booksOnPreviousPage: Book[] = [];

    /**
     * Array of books on next page.
     */
    booksOnNextPage: Book[] = [];

    /**
     * Current page number.
     */
    currentPage: number = 1;

    /**
     * Constructor that instantiates a BooksPageComponent.
     * 
     * @param bookService The service injected for fetching book data.
     */
    constructor(public bookService: BookService) { }

    /**
     * Gets called when component is initialized.
     */
    ngOnInit(): void {
        this.bookService.getBooks(this.currentPage)
            .subscribe(result => this.booksOnCurrentPage = result);
        this.bookService.getBooks(this.currentPage + 1)
            .subscribe(result => this.booksOnNextPage = result);
    }

    /**
     * Gets previous page of books.
     * Caches previous page of books.
     */
    getPreviousPage(): void {
        if (this.isFirstPage()) {
            return;
        }

        this.booksOnNextPage = this.booksOnCurrentPage;
        this.booksOnCurrentPage = this.booksOnPreviousPage;
        this.currentPage--;
        if (this.isFirstPage()) {
            this.booksOnPreviousPage = [];
            return;
        }

        this.bookService.getBooks(this.currentPage - 1)
            .subscribe(result => this.booksOnPreviousPage = result);
    }


    /**
     * Gets next page of books.
     * Caches next page of books.
     */
    getNextPage(): void {
        if (this.isLastPage()) {
            return;
        }

        this.booksOnPreviousPage = this.booksOnCurrentPage;
        this.booksOnCurrentPage = this.booksOnNextPage;
        this.currentPage++;
        if (this.isLastPage()) {
            this.booksOnNextPage = [];
            return;
        }

        this.bookService.getBooks(this.currentPage + 1)
            .subscribe(result => this.booksOnNextPage = result);
    }

    /**
     * Sets 'book' in local storage.
     * 
     * @param book The book we want to show.
     */
    setSelectedBook(book: Book): void {
        localStorage.setItem('book', JSON.stringify(book));
    }

    /**
     * Checks if first page is shown.
     * 
     * @returns true if it is the first page, false otherwise
     */
    isFirstPage(): boolean {
        return this.currentPage <= 1;
    }

    /**
     * Checks if last page is shown.
     * 
     * @returns true if it is the last page, false otherwise
     */
    isLastPage(): boolean {
        return this.booksOnNextPage.length === 0 ||
            this.booksOnCurrentPage.length < this.bookService.pageSize;
    }
}