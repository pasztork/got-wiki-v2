import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { Observable, filter } from "rxjs";

/**
 * Component for top bar.
 */
@Component({
    selector: 'got-wiki-app',
    templateUrl: './got-wiki-app.component.html',
    styleUrls: ['./got-wiki-app.component.css']
})
export class GoTWikiAppComponent { }