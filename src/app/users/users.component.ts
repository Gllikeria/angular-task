import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  constructor(private api: ApiService, private router: Router) {}
  usersArray: any = []; //all displayed users
  isPending: boolean = false; //for loader

  ngAfterViewInit(): void {
    this.observer.observe(this.footer.nativeElement);
  }
  @ViewChild('footer') footer!: ElementRef<HTMLElement>;

  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };
  //footer observer to load users if its in the view
  observer = new IntersectionObserver((enteries) => {
    if (enteries[0].isIntersecting) {
      this.loadusers();
    }
  }, this.options);

  loadusers() {
    this.isPending = true;
    if (this.api.pagesToLoad) {
      this.api.getAllusers().subscribe((data) => {
        this.isPending = false;

        let apiKeys = Object.values(data);
        apiKeys[1].forEach((element: any) => {
          //push single user in array
          this.usersArray.push(element);
        });

        if (apiKeys[0].nextPage) {
          this.api.currentPage++;
        } else {
          this.api.pagesToLoad = false;
        }
      });
    } else {
      alert('no more pages');
    }
  }

  userComp(id: any) {
    //called when single user item is clicked
    this.router.navigate(['/user', id.id]);
  }
  ngOnDestroy() {
    //reset users Array and default page
    this.usersArray = [];
    this.api.currentPage = 1;
  }
}
