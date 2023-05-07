import { Component } from '@angular/core';
import { House } from 'src/app/models/house.type';
import { HouseService } from 'src/app/services/house.service';

/**
 * Component for house list view.
 */
@Component({
  selector: 'app-houses-page',
  templateUrl: './houses-page.component.html',
  styleUrls: ['./houses-page.component.css']
})
export class HousesPageComponent {
  /**
   * Array of houses currently shown.
   */
  housesOnCurrentPage: House[] = [];

  /**
   * Array of previous page of houses.
   */
  housesOnPreviousPage: House[] = [];

  /**
   * Array of next page of houses.
   */
  housesOnNextPage: House[] = [];

  /**
   * Current page number.
   */
  currentPage: number = 1;

  /**
   * Constructor that instatiates a HousePageComponent.
   * 
   * @param houseService The service used for fetching house data.
   */
  constructor(public houseService: HouseService) { }

  /**
   * Gets called when component is initialized.
   * Fetches book data.
   */
  ngOnInit(): void {
    this.houseService.getHouses(this.currentPage)
      .subscribe(result => this.housesOnCurrentPage = result);
    this.houseService.getHouses(this.currentPage + 1)
      .subscribe(result => this.housesOnNextPage = result);
  }

  /**
   * Gets previous page.
   * Caches next page.
   */
  getPreviousPage(): void {
    if (this.isFirstPage()) {
      return;
    }

    this.housesOnNextPage = this.housesOnCurrentPage;
    this.housesOnCurrentPage = this.housesOnPreviousPage;
    this.currentPage--;
    if (this.isFirstPage()) {
      this.housesOnPreviousPage = [];
      return;
    }

    this.houseService.getHouses(this.currentPage - 1)
      .subscribe(result => this.housesOnPreviousPage = result);
  }

  /**
   * Gets next page.
   * Caches previous page.
   */
  getNextPage(): void {
    if (this.isLastPage()) {
      return;
    }

    this.housesOnPreviousPage = this.housesOnCurrentPage;
    this.housesOnCurrentPage = this.housesOnNextPage;
    this.currentPage++;
    if (this.isLastPage()) {
      this.housesOnNextPage = [];
      return;
    }

    this.houseService.getHouses(this.currentPage + 1)
      .subscribe(result => this.housesOnNextPage = result);
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
    return this.housesOnNextPage.length === 0 ||
      this.housesOnCurrentPage.length < this.houseService.pageSize;
  }
}
