import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PostService {
    public url: string;

    constructor( private _http: HttpClient) {
        this.url = global.url;
    }

    create(token, post): Observable<any> {
        post.content = global.htmlEntities(post.content);
        const json = JSON.stringify(post);
        const params = 'json=' + json;
        console.log(params);
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                         .set('Authorization', token);
        return this._http.post(this.url + 'post', params, { headers: headers });
    }

    getPosts(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post', { headers: headers });
    }

    getPost(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/' + id, { headers: headers });
    }

    update(token, post, id): Observable<any> {
        post.content = global.htmlEntities(post.content);
        const json = JSON.stringify(post);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                         .set('Authorization', token);
        return this._http.put(this.url + 'post/' + id, params, { headers: headers });
    }

    delete(token, id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                         .set('Authorization', token);
        return this._http.delete(this.url + 'post/' + id, { headers: headers });
    }
}