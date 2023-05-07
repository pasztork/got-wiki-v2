import { Component } from '@angular/core';
import { Character } from 'src/app/models/character.type';
import { CharacterService } from 'src/app/services/character.service';

/**
 * Component for characters list page.
 */
@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.css']
})
export class CharactersPageComponent {
  /**
   * Characters shown on current page.
   */
  charactersOnCurrentPage: Character[] = [];

  /**
   * Characters on the previous page.
   */
  charactersOnPreviousPage: Character[] = [];

  /**
   * Characters on the next page.
   */
  charactersOnNextPage: Character[] = [];

  /**
   * Current page number.
   */
  currentPage: number = 1;

  /**
   * Constructor that instantiates a CharactersPageComponent.
   * 
   * @param characterService The service used for fetching characters.
   */
  constructor(public characterService: CharacterService) { }

  /**
   * Initializes the component.
   * Fetches characters.
   */
  ngOnInit(): void {
    this.characterService.getCharacters(this.currentPage)
      .subscribe(result => this.charactersOnCurrentPage = result);
    this.characterService.getCharacters(this.currentPage + 1)
      .subscribe(result => this.charactersOnNextPage = result);
  }

  /**
   * Gets previous page of characters.
   * Caches next page.
   */
  getPreviousPage(): void {
    if (this.isFirstPage()) {
      return;
    }

    this.charactersOnNextPage = this.charactersOnCurrentPage;
    this.charactersOnCurrentPage = this.charactersOnPreviousPage;
    this.currentPage--;
    if (this.isFirstPage()) {
      this.charactersOnPreviousPage = [];
      return;
    }

    this.characterService.getCharacters(this.currentPage - 1)
      .subscribe(result => this.charactersOnPreviousPage = result);
  }

  /**
   * Gets next page of characters.
   * Caches previous page.
   */
  getNextPage(): void {
    if (this.isLastPage()) {
      return;
    }

    this.charactersOnPreviousPage = this.charactersOnCurrentPage;
    this.charactersOnCurrentPage = this.charactersOnNextPage;
    this.currentPage++;
    if (this.isLastPage()) {
      this.charactersOnNextPage = [];
      return;
    }

    this.characterService.getCharacters(this.currentPage + 1)
      .subscribe(result => this.charactersOnNextPage = result);
  }

  /**
   * Sets 'character' in local storage.
   * 
   * @param character The character we want to show.
   */
  setSelectedCharacter(character: Character): void {
    localStorage.setItem('character', JSON.stringify(character));
  }

  /**
   * Checks if first page is shown.
   * 
   * @returns true if first page is shown, otherwise false
   */
  isFirstPage(): boolean {
    return this.currentPage <= 1;
  }

  /**
   * Checks if last page is shown.
   * 
   * @returns true if last page is shown, otherwise false
   */
  isLastPage(): boolean {
    return this.charactersOnNextPage.length === 0 ||
      this.charactersOnCurrentPage.length < this.characterService.pageSize;
  }
}
