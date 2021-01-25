import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService{
    public isHome = false;

    constructor(private _http: HttpClient) {
    }

    getIsHome(): boolean {
        return this.isHome;
    }

    setIsHome(home) {
        this.isHome = home;
    }

}