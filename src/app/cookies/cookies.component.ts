import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-cookies',
  standalone: true,
  templateUrl: './cookies.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  visible = false;

  ngOnInit() {
    const consent = localStorage.getItem('cookiesConsent');
    if (!consent) {
      this.visible = true;
    }
  }

  confirm() {
    localStorage.setItem('cookiesConsent', 'true');
    this.visible = false;
  }
}
