/**
 * Interface for a Book in the "A Song of Ice and Fire" universe.
 */
export interface Book {
    /**
     * The URL of the book resource.
     */
    url: string;

    /**
     * The name of the book.
     */
    name: string;

    /**
     * The International Standard Book Number (ISBN) of the book.
     */
    isbn: string;

    /**
     * An array of the names of the authors of the book.
     */
    authors: string[];

    /**
     * The number of pages in the book.
     */
    numberOfPages: number;

    /**
     * The name of the publisher of the book.
     */
    publisher: string;

    /**
     * The name of the country where the book was published.
     */
    country: string;

    /**
     * The media type of the book (e.g. "Hardcover", "Paperback", "E-book").
     */
    mediaType: string;

    /**
     * The date of release of the book.
     */
    released: Date;

    /**
     * An array of the URLs of the character resources that appear in the book.
     */
    characters: string[];

    /**
     * An array of the URLs of the character resources that appear as point-of-view characters in the book.
     */
    povCharacters: string[];
}
