import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for home page view.
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  /**
   * The term one can search for.
   */
  searchTerm: string = '';

  /**
   * Constructor that instantiates HomePageComponent.
   * 
   * @param router The router used for navigating to search page.
   */
  constructor(private router: Router) { }

  /**
   * Sets 'searchTerm' in local storage and navigates to search results page.
   */
  search(): void {
    localStorage.setItem('searchTerm', this.searchTerm);
    this.router.navigate(['/search']);
  }
}
