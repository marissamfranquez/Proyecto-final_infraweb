import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [ UserService, CategoryService ]
})
export class CategoryNewComponent implements OnInit {
  public pageTittle: string;
  public identity;
  public token;
  public category: Category;
  public status: string;

  constructor(private _route: ActivatedRoute, private _router: Router,
              private _userService: UserService, private _categoryService: CategoryService) {
    this.pageTittle = 'Crear nueva categoría';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status == 'success') {
          this.category = response.category;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
