import { Component } from '@angular/core';
import { Book } from 'src/app/models/book.type';
import { Character } from 'src/app/models/character.type';
import { House } from 'src/app/models/house.type';
import { BookService } from 'src/app/services/book.service';
import { CharacterService } from 'src/app/services/character.service';
import { HouseService } from 'src/app/services/house.service';

/**
 * Component for detailed character view.
 */
@Component({
  selector: 'app-character-details-page',
  templateUrl: './character-details-page.component.html',
  styleUrls: ['./character-details-page.component.css']
})
export class CharacterDetailsPageComponent {
  /**
   * The number of items shown on a page.
   */
  readonly pageSize: number = 5;

  /**
   * The character being shown.
   */
  character: Character | undefined = undefined;

  /**
   * The father of the character.
   */
  father: Character | undefined = undefined;

  /**
   * The mother of the character.
   */
  mother: Character | undefined = undefined;

  /**
   * The spouse of the character.
   */
  spouse: Character | undefined = undefined;

  /**
   * The allegiances of the character.
   */
  allegiances: House[] = [];

  /**
   * Books being show.
   */
  booksOnCurrentPage: Book[] = [];

  /**
   * The page number of currently shown books.
   */
  bookPage: number = 0;

  /**
   * Pov books being show.
   */
  povBooksOnCurrentPage: Book[] = [];

  /**
   * The page number of currently shown pov books.
   */
  povBookPage: number = 0;


  /**
   * Constructor that initializes a CharacterDetailsPageComponent.
   * 
   * @param bookService The service used for fetching book data.
   * @param characterService The service used for fetching character data.
   * @param houseService The service used for fetching house data.
   */
  constructor(
    private bookService: BookService,
    private characterService: CharacterService,
    private houseService: HouseService) { }

  /**
   * Gets called when component is initialized.
   * Fetches all data that is shown on page.
   */
  ngOnInit(): void {
    this.getCharacter();
    this.getRelatedCharacters();
    this.getAllegiances();
    this.getBooks(
      this.booksOnCurrentPage,
      { value: this.bookPage, urls: this.character?.books || [] }
    );
    this.getBooks(
      this.povBooksOnCurrentPage,
      { value: this.povBookPage, urls: this.character?.povBooks || [] }
    );
  }

  /**
   * Sets 'character' in local storage.
   * 
   * @param character The character we want to show.
   */
  setSelectedCharacter(character: Character): void {
    localStorage.setItem('character', JSON.stringify(character));
    this.ngOnInit();
  }

  /**
   * Sets 'house' in local storage.
   * 
   * @param house The house we want to show.
   */
  setSelectedHouse(house: House): void {
    localStorage.setItem('house', JSON.stringify(house));
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
   * Gets previous page of books.
   * Does nothing if first page is shown.
   */
  getPreviousBookPage(): void {
    if (this.bookPage === 0) {
      return;
    }
    this.bookPage--;
    this.getBooks(
      this.booksOnCurrentPage,
      { value: this.bookPage, urls: this.character?.books || [] }
    );
  }

  /**
   * Gets next page of books.
   * Does nothing if last page is shown.
   */
  getNextBookPage(): void {
    if (!this.character ||
      this.isLastPage(this.bookPage, this.booksOnCurrentPage.length, this.character.books.length)) {
      return;
    }
    this.bookPage++;
    this.getBooks(
      this.booksOnCurrentPage,
      { value: this.bookPage, urls: this.character?.books || [] }
    );
  }

  /**
   * Gets previous page of pov books.
   * Does nothing if first page is shown.
   */
  getPreviousPovBookPage(): void {
    if (this.povBookPage === 0) {
      return;
    }
    this.povBookPage--;
    this.getBooks(
      this.povBooksOnCurrentPage,
      { value: this.povBookPage, urls: this.character?.povBooks || [] }
    );
  }

  /**
   * Gets next page of pov books.
   * Does nothing if last page is shown.
   */
  getNextPovBookPage(): void {
    if (!this.character ||
      this.isLastPage(this.povBookPage, this.povBooksOnCurrentPage.length, this.character.povBooks.length)) {
      return;
    }
    this.povBookPage++;
    this.getBooks(
      this.povBooksOnCurrentPage,
      { value: this.povBookPage, urls: this.character?.povBooks || [] }
    );
  }

  /**
   * Checks if current page is the last one.
   * 
   * @param page The page number being checked.
   * @param currentCharacterCount The number of shown characters.
   * @param allCharactersCount The total number of characters.
   * 
   * @returns true if it is the last page, otherwise false
   */
  isLastPage(page: number, currentBookCount: number, allBooksCount: number): boolean {
    return page * this.pageSize + currentBookCount === allBooksCount;
  }

  private getCharacter(): void {
    const jsonString = localStorage.getItem('character');
    if (!jsonString) {
      return;
    }
    this.character = JSON.parse(jsonString);
  }

  private getRelatedCharacters(): void {
    this.characterService.getCharacter(this.character?.father || '')
      .subscribe(result => this.father = result);
    this.characterService.getCharacter(this.character?.mother || '')
      .subscribe(result => this.mother = result);
    this.characterService.getCharacter(this.character?.spouse || '')
      .subscribe(result => this.spouse = result);
  }

  private getAllegiances(): void {
    this.allegiances.length = 0;
    for (const houseUrl of this.character?.allegiances || []) {
      this.houseService.getHouse(houseUrl)
        .subscribe(result => this.allegiances.push(result));
    }
  }

  private getBooks(books: Book[], obj: { value: number, urls: string[] }): void {
    books.length = 0;
    const start = obj.value * this.pageSize;
    for (let i = start; i < start + this.pageSize; i++) {
      this.bookService.getBook(obj.urls[i])
        .subscribe(result => books.push(result));
    }
  }
}
