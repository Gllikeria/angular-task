import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
})
export class SingleUserComponent {
  currentUser: any;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let id = this.route.snapshot.paramMap.get('id');
        this.api.getUser(id).subscribe((user) => {
          this.currentUser = user;
        });
      }
      if (event instanceof NavigationStart) {
        let id = this.route.snapshot.paramMap.get('id');
      }
    });
  }
}
