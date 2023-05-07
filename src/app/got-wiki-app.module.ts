import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { GoTWikiAppComponent } from './components/got-wiki-app/got-wiki-app.component';
import { BookService } from './services/book.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { BookDetailsPageComponent } from './components/book-details-page/book-details-page.component';
import { CharacterService } from './services/character.service';
import { CharactersPageComponent } from './components/characters-page/characters-page.component';
import { HousesPageComponent } from './components/houses-page/houses-page.component';
import { HouseService } from './services/house.service';
import { CharacterDetailsPageComponent } from './components/character-details-page/character-details-page.component';
import { HouseDetailsPageComponent } from './components/house-details-page/house-details-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

let routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'books', component: BooksPageComponent },
  { path: 'book-details', component: BookDetailsPageComponent },
  { path: 'characters', component: CharactersPageComponent },
  { path: 'character-details', component: CharacterDetailsPageComponent },
  { path: 'houses', component: HousesPageComponent },
  { path: 'house-details', component: HouseDetailsPageComponent },
  { path: 'search', component: SearchPageComponent }
]

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule, MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatListModule, BrowserAnimationsModule],
  exports: [RouterModule],
  declarations: [GoTWikiAppComponent, BooksPageComponent, HomePageComponent, BookDetailsPageComponent, CharactersPageComponent, HousesPageComponent, CharacterDetailsPageComponent, HouseDetailsPageComponent, SearchPageComponent],
  providers: [BookService, CharacterService, HouseService],
  bootstrap: [GoTWikiAppComponent]
})
export class GoTWikiAppModule { }
