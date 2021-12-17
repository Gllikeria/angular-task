import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    // console.log('destroy user-page');
  }
  ngOnInit(): void {}
}
