import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf} from '@angular/common';

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

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem('cookiesConsent');
      if (!consent) {
        this.visible = true;
      }
    } else {
      this.visible = true;
    }
  }

  confirm() {
    localStorage.setItem('cookiesConsent', 'true');
    this.visible = false;
  }
}
