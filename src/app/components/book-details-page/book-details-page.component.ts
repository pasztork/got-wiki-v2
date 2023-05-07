import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.type';
import { Character } from 'src/app/models/character.type';
import { CharacterService } from 'src/app/services/character.service';

/**
 * Component for a books detailed view.
 */
@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.css']
})
export class BookDetailsPageComponent implements OnInit {
  /**
   * Number of items shown in one page.
   */
  readonly pageSize: number = 5;

  /**
   * The book shown on the page.
   */
  book: Book | undefined = undefined;

  /**
   * The characters shown on the page.
   */
  charactersOnCurrentPage: Character[] = [];

  /**
   * The page number of the shown character page.
   */
  characterPage: number = 0;

  /**
   * The pov characters shown on the page.
   */
  povCharactersOnCurrentPage: Character[] = [];

  /**
   * The page number of the shown pov character page.
   */
  povCharacterPage: number = 0;

  /**
   * Constructor that instantiates a new BookDetailsPageComponent.
   * 
   * @param characterService The service used for fetching characters.
   */
  constructor(private characterService: CharacterService) { }

  /**
   * Called when page is initialized.
   * Fetches all data that are shown on page.
   */
  ngOnInit(): void {
    this.getBook();
    this.getCharacters(
      this.charactersOnCurrentPage,
      { value: this.characterPage, urls: this.book?.characters || [] }
    );
    this.getCharacters(
      this.povCharactersOnCurrentPage,
      { value: this.povCharacterPage, urls: this.book?.povCharacters || [] }
    );
  }

  /**
   * Gets previous page of character that are present in the book.
   * If the first page is shown, nothing happens.
   */
  getPreviousCharacterPage(): void {
    if (this.characterPage === 0) {
      return;
    }
    this.characterPage--;
    this.getCharacters(
      this.charactersOnCurrentPage,
      { value: this.characterPage, urls: this.book?.characters || [] }
    );
  }

  /**
   * Gets next page of character that are present in the book.
   * If the last page is shown, nothing happens.
   */
  getNextCharacterPage(): void {
    if (!this.book ||
      this.isLastPage(this.characterPage, this.charactersOnCurrentPage.length, this.book.characters.length)) {
      return;
    }
    this.characterPage++;
    this.getCharacters(
      this.charactersOnCurrentPage,
      { value: this.characterPage, urls: this.book.characters }
    );
  }

  /**
   * Gets previous page of pov character that are present in the book.
   * If the first page is shown, nothing happens.
   */
  getPreviousPovCharacterPage(): void {
    if (this.povCharacterPage === 0) {
      return;
    }
    this.povCharacterPage--;
    this.getCharacters(
      this.povCharactersOnCurrentPage,
      { value: this.povCharacterPage, urls: this.book?.povCharacters || [] }
    );
  }

  /**
   * Gets next page of pov character that are present in the book.
   * If the last page is shown, nothing happens.
   */
  getNextPovCharacterPage(): void {
    if (!this.book ||
      this.isLastPage(this.povCharacterPage, this.povCharactersOnCurrentPage.length, this.book.povCharacters.length)) {
      return;
    }
    this.povCharacterPage++;
    this.getCharacters(
      this.povCharactersOnCurrentPage,
      { value: this.povCharacterPage, urls: this.book.povCharacters }
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
  isLastPage(page: number, currentCharacterCount: number, allCharactersCount: number): boolean {
    return page * this.pageSize + currentCharacterCount === allCharactersCount;
  }

  /**
   * Sets 'character' in local storage.
   * 
   * @param character The character we want to show.
   */
  setSelectedCharacter(character: Character): void {
    localStorage.setItem('character', JSON.stringify(character));
  }

  private getBook(): void {
    const jsonString = localStorage.getItem('book');
    if (!jsonString) {
      return;
    }
    this.book = JSON.parse(jsonString);
  }

  private getCharacters(characters: Character[], obj: { value: number, urls: string[] }): void {
    characters.length = 0;
    const start = obj.value * this.pageSize;
    for (let i = start; i < start + this.pageSize; i++) {
      this.characterService.getCharacter(obj.urls[i])
        .subscribe(result => {
          result.name = result.name || 'Anonymous';
          characters.push(result)
        });
    }
  }
}
