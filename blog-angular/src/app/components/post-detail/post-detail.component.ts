import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [ PostService, UserService ]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public url;
  public identity;
  public token;

  constructor(private _postService: PostService, private _route: ActivatedRoute,
              private _router: Router, private _userService: UserService) { 
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this._route.params.subscribe(params => {
      var id = params['id'];
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.post = response.posts;
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
