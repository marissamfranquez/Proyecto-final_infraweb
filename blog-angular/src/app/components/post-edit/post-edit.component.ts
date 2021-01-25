import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd, NavigationStart } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public pageTitle: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;
  public isEdit = true;
  public url: string;
  public froalaOptions: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI:  {
      url: global.url + 'post/upload',
      method: 'POST',
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu imagen del post...'
  };

  constructor(private _route: ActivatedRoute, private _router: Router,
              private _userService: UserService, private _categoryService: CategoryService,
              private _postService: PostService) {
    this.pageTitle = 'Editar un nuevo post';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.isEdit = true;
    this.url = global.url;
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getGategories();
    this.getPost();
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

  imageUpload(data) {
    const imgData = JSON.parse(data.response);
    this.post.image = imgData.image;
  }

  onSubmit(form) {
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this._router.navigate(['/posts']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  getPost() {
    this._route.params.subscribe(params => {
      var id = params['id'];
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.post = response.posts;
            if (this.post.user_id != this.identity.sub) {
              this._router.navigate(['/inicio']);
            }
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.error(error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }
}
