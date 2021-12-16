import { Router } from '@angular/router';
import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private api: ApiService, private router: Router) {}
  usersObj: any;
  usersArray: any = [];
  obs$: any;
  isPending: boolean = false;
  @ViewChild('footer') footer!: ElementRef<HTMLElement>;
  ngOnInit(): void {
    // this.api.getAllusers();
    // this.usersArray = this.api.usersArray;
  }
  ngAfterViewInit(): void {
    this.observer.observe(this.footer.nativeElement);
  }
  ngOnDestroy() {
    this.usersArray = [];
    this.api.currentPage = 1;
  }

  loadusers() {
    this.isPending = true;
    if (this.api.pagesToLoad) {
      this.api.getAllusers().subscribe((data) => {
        this.isPending = false;
        let a = Object.values(data);
        a[1].forEach((element: any) => {
          this.usersArray.push(element);
        });
        if (a[0].nextPage) {
          this.api.currentPage++;
        } else {
          this.api.pagesToLoad = false;
        }
      });
    } else {
      alert('no more pages');
    }
  }

  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  observer = new IntersectionObserver((enteries) => {
    if (enteries[0].isIntersecting) {
      this.loadusers();
    }
    console.log(enteries);
  }, this.options);

  userComp(id: any) {
    this.router.navigate(['/user', id.id]);
  }
}
