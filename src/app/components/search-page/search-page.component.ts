import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.type';
import { Character } from 'src/app/models/character.type';
import { House } from 'src/app/models/house.type';
import { BookService } from 'src/app/services/book.service';
import { CharacterService } from 'src/app/services/character.service';
import { HouseService } from 'src/app/services/house.service';

/**
 * Component of search results page.
 */
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  /**
   * Search term that was used.
   */
  searchTerm: string = '';

  /**
   * Array of books with matching name.
   */
  books: Book[] = [];

  /**
   * Array of characters with matching name.
   */
  characters: Character[] = [];

  /**
   * Array of houses with matching name.
   */
  houses: House[] = [];

  /**
   * Constructor that instantiates a SearchPageComponent.
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
   * Fetches items that match search criteria.
   */
  ngOnInit(): void {
    this.searchTerm = localStorage.getItem('searchTerm') || '';
    this.bookService.getBookByName(this.searchTerm)
      .subscribe(result => this.books = result);
    this.characterService.getCharacterByName(this.searchTerm)
      .subscribe(result => this.characters = result);
    this.houseService.getHouseByName(this.searchTerm)
      .subscribe(result => this.houses = result);
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
   * Sets 'character' in local storage.
   * 
   * @param character The character we want to show.
   */
  setSelectedCharacter(character: Character): void {
    localStorage.setItem('character', JSON.stringify(character));
  }

  /**
   * Sets 'house' in local storage.
   * 
   * @param house The house we want to show.
   */
  setSelectedHouse(house: House): void {
    localStorage.setItem('house', JSON.stringify(house));
  }
}
