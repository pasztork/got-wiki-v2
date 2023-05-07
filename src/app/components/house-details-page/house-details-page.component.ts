import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.type';
import { House } from 'src/app/models/house.type';
import { CharacterService } from 'src/app/services/character.service';
import { HouseService } from 'src/app/services/house.service';

/**
 * Component for detailed house view.
 */
@Component({
  selector: 'app-house-details-page',
  templateUrl: './house-details-page.component.html',
  styleUrls: ['./house-details-page.component.css']
})
export class HouseDetailsPageComponent implements OnInit {
  /**
   * Max number of items shown in a page.
   */
  readonly pageSize: number = 5;

  /**
   * The house shown.
   */
  house: House | undefined = undefined;

  /**
   * The current lord of the house.
   */
  currentLord: Character | undefined = undefined;

  /**
   * The heir of the house.
   */
  heir: Character | undefined = undefined;

  /**
   * The overlord of the hosue.
   */
  overlord: House | undefined = undefined;

  /**
   * Array of cadet houses.
   */
  cadetBranches: House[] = [];

  /**
   * Array of characters shown in page.
   */
  charactersOnCurrentPage: Character[] = [];

  /**
   * Current character page number.
   */
  characterPage: number = 0;

  /**
   * Constructor that instatiates a HouseDetailsPageComponent.
   * 
   * @param characterService The service used for fetching character data.
   * @param houseService The service used for fetching house data.
   */
  constructor(
    private characterService: CharacterService,
    private houseService: HouseService) { }

  /**
   * Gets called when component is initialized.
   * Fetches data shown.
   */
  ngOnInit(): void {
    this.getHouse();
    this.getRelatedCharacters();
    this.getRelatedHouses();
    this.getCharacters();
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
    this.ngOnInit();
  }

  /**
   * Gets previous page of characters.
   * Does nothing, if first page is shown.
   */
  getPreviousCharacterPage(): void {
    if (this.characterPage === 0) {
      return;
    }
    this.characterPage--;
    this.getCharacters();
  }

  /**
   * Gets next page of characters.
   * Does nothing, if last page is shown.
   */
  getNextCharacterPage(): void {
    if (!this.house || this.isLastPage()) {
      return;
    }
    this.characterPage++;
    this.getCharacters();
  }

  /**
   * Check if last page is shown.
   * 
   * @returns true if last page is shown, otherwise false
   */
  isLastPage(): boolean {
    return this.characterPage * this.pageSize +
      this.charactersOnCurrentPage.length === this.house?.swornMembers.length;
  }

  private getHouse(): void {
    const jsonString = localStorage.getItem('house');
    if (!jsonString) {
      return;
    }
    this.house = JSON.parse(jsonString);
  }

  private getRelatedCharacters(): void {
    this.characterService.getCharacter(this.house?.currentLord || '')
      .subscribe(result => this.currentLord = result);
    this.characterService.getCharacter(this.house?.heir || '')
      .subscribe(result => this.heir = result);
  }

  private getRelatedHouses(): void {
    this.houseService.getHouse(this.house?.overlord || '')
      .subscribe(result => this.overlord = result);

    this.cadetBranches.length = 0;
    for (const houseUrl of this.house?.cadetBranches || []) {
      this.houseService.getHouse(houseUrl)
        .subscribe(result => this.cadetBranches.push(result));
    }
  }

  private getCharacters(): void {
    this.charactersOnCurrentPage.length = 0;
    const start = this.characterPage * this.pageSize;
    for (let i = start; i < start + this.pageSize; i++) {
      this.characterService.getCharacter(this.house?.swornMembers[i] || '')
        .subscribe(result => this.charactersOnCurrentPage.push(result));
    }
  }
}
