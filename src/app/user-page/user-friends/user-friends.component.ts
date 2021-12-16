import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss'],
})
export class UserFriendsComponent implements OnInit {
  currentUser: any;
  usersQueue: any = [];
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.api.currentFriendsPage = 1;
      }
      if (event instanceof NavigationStart) {
        this.friendsArray = [];
      }
    });
  }
  queueArray: any = [];
  isPending: boolean = false;
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.friendsArray = [];
    this.api.getUser(id).subscribe((data) => {
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
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

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

  friendsArray: any = [];

  ngOnDestroy() {
    this.friendsArray = [];
    this.api.currentFriendsPage = 1;
    this.queueArray = [];
  }
  userComp(userObj: any) {
    this.router.navigate(['user/', userObj.id]);
    this.queueArray.push(userObj);
  }
}
