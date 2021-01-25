import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor( public _http: HttpClient) {
        this.url = global.url;
    }

    register(user): Observable<any> {
        const json = JSON.stringify(user);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, getToken = null): Observable<any> {
        if (getToken != null) {
            user.gettoken = true;
        }

        const json = JSON.stringify(user);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    update(token, user): Observable<any> {
        user.description = global.htmlEntities(user.description);
        const json = JSON.stringify(user);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                         .set('Authorization', token);
        return this._http.put(this.url + 'user/update', params, { headers: headers });
    }

    getIdentity(){
        const identity = JSON.parse(localStorage.getItem('identity'));
        if (identity && identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        const token = localStorage.getItem('token');
        if (token && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }
}
