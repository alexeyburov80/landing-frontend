import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactItems$: Observable<any[]>;
  constructor(private router: Router,
              private api: ApiService) {
    this.contactItems$ = this.api.getContacts();
  }
}
