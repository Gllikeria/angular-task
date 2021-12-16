import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    console.log('destroy user-page');
  }
  ngOnInit(): void {}
}
