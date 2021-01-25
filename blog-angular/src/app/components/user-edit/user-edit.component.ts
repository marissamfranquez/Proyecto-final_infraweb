import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url;

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
    maxSize: '1',
    uploadAPI:  {
      url: global.url + 'user/upload',
      method: 'POST',
      headers: {
        "Authorization": this._userService.getToken()
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar de usuario...'
};

  constructor(public _userService: UserService) {
    this.pageTitle = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email, '',
      this.identity.description,
      this.identity.image);
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      responsive => {
        if (responsive && responsive.status) {
          console.log(responsive);
          this.status = 'success';
          // Acutializar usuario en sesión
          if (responsive.changes.name) {
            this.user.name = responsive.changes.name;
          }
          if (responsive.changes.surname) {
            this.user.surname = responsive.changes.surname;
          }
          if (responsive.changes.email) {
            this.user.email = responsive.changes.email;
          }
          if (responsive.changes.description) {
            this.user.description = responsive.changes.description;
          }
          if (responsive.changes.image) {
            this.user.image = responsive.changes.image;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.user.image = data.image;
  }
}
