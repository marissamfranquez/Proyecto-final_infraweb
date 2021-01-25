import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  providers: [PostService, UserService, CategoryService]
})
export class AllPostsComponent implements OnInit {
  public pageTitle: string;
  public url;
  public posts: Array<Post>;
  public identity;
  public token;
  public categories;
  public status;
  public opcionSeleccionado: string;

  constructor(private _postService: PostService, private _userService: UserService,
              private _categoryService: CategoryService) {
    this.pageTitle = 'Home';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
    this.getGategories();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
        } else {
          console.error(response.message);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.error(error);
      }
    );
  }

  getGategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
          status = 'success';
        }
      },
      error => {
        status = 'error';
      }
    );
  }

  filtrar() {
    if (this.opcionSeleccionado == '0') {
      this.getPosts();
    } else {
      this.getPostsByCategory(this.opcionSeleccionado);
    }
  }

  getPostsByCategory(id) {
    this._categoryService.getPosts(id).subscribe(
      response => {
        if (response.status == 'success') {
          console.log(response);
          this.posts = response.posts;
        } else {
          console.error('error');
        }
      },
      error => {
        console.error(error);
      });
  }
}
