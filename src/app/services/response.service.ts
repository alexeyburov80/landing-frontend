import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = '/api/send_email';

  constructor(private http: HttpClient) {}

  sendForm(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
