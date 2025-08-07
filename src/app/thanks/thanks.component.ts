import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thanks',
  imports: [],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
