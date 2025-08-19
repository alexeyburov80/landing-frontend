import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getHome(): Observable<any> {
    return this.http.get('assets/api-home.json').pipe(map(d => (d as any).home)) as Observable<any>;
  }

  public getProducts(): Observable<any> {
    return this.http.get('assets/api-products.json').pipe(map(d => (d as any).products)) as Observable<any[]>;
  }

  public getContacts(): Observable<any> {
    return this.http.get('assets/api-contacts.json').pipe(map(d => (d as any).contacts)) as Observable<any[]>;
  }

}
