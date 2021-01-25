import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { CategoryService } from './services/category.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService, CategoryService ]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'Blog Angular';
  public idendity;
  public token;
  public url;
  public categories;
  public isHome;
  public isAllPost;
  public isCovid;

  constructor(private _userService: UserService, private _categoryService: CategoryService,
              private _router: Router) {
    this.loadUser();
    this.url = global.url;
    this._router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationStart') {
        if (event instanceof NavigationStart) {
          if (event.url == '/inicio' || event.url == '/') {
            this.isHome = true;
            this.isAllPost = false;
            this.isCovid = false;
          } else {
            this.isHome = false;
          }

          const arrayUrls = [];
          for(let i = 1; i <= 100; i++) {
            arrayUrls.push('/entrada/' + i);
          }
          console.log(arrayUrls);

          if (event.url == '/posts' || arrayUrls.includes(event.url)) {
            this.isAllPost = true;
          } else {
            this.isAllPost = false;
          }

          if (event.url == '/info-covid') {
            this.isCovid = true;
          } else {
            this.isCovid = false;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.idendity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}
