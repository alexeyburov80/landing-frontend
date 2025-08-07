import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs';
import { SocialsComponent } from './socials/socials.component';

@Component({
  selector: 'app-home',
  imports: [NgIf, AsyncPipe, SocialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public data$: Observable<any>;

  constructor(private router: Router, private api: ApiService) {
    this.data$ = this.api.getHome();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
