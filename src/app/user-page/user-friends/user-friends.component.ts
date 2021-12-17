import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IUser } from './IUser';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss'],
})
export class UserFriendsComponent implements OnInit {
  friendsArray: object[] = [];
  queueArray: object[] = [];
  isPending: boolean = false;
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //after every navigation pages load from start
        this.api.currentFriendsPage = 1;
      }
      if (event instanceof NavigationStart) {
        // every new navigation will have new friends, so array should be empty
        this.friendsArray = [];
      }
    });
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.friendsArray = [];
    this.api.getUser(id).subscribe((data) => {
      // for friends navigation history
      // for first user
      this.queueArray.push(data);
    });
  }
  friendNavigation(friendObj: any) {
    this.router.navigate(['user/', friendObj.id]);
  }
  @ViewChild('footer') footer!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.observer.observe(this.footer.nativeElement);
  }

  observer = new IntersectionObserver((enteries) => {
    if (enteries[0].isIntersecting) {
      this.isPending = true;

      let id = this.route.snapshot.paramMap.get('id');
      this.api.getFriends(id).subscribe((data) => {
        this.isPending = false;
        let a = Object.values(data);
        a[1].forEach((element: any) => {
          this.friendsArray.push(element);
        });
      });
    }
  }, this.options);

  ngOnDestroy() {
    this.friendsArray = [];
    this.api.currentFriendsPage = 1;
    this.queueArray = [];
  }
  userComp(userObj: IUser) {
    this.router.navigate(['user/', userObj.id]);
    this.queueArray.push(userObj); //every other friend that is clicked
  }
}
