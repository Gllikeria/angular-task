import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
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
        // after every navigation load new user
        let id = this.route.snapshot.paramMap.get('id'); //get param from URL
        this.api.getUser(id).subscribe((user: object) => {
          this.currentUser = user;
        });
      }
    });
  }
}
