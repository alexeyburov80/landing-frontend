import {Component, Inject, PLATFORM_ID} from '@angular/core';
// import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {isPlatformBrowser, NgOptimizedImage} from '@angular/common';
import { SeoService } from './services/seo.service';
import { NavigationComponent } from './navigation/navigation.component';
import {YandexAnalyticsService} from './services/yandex-analytics.service';
import {CookiesComponent} from './cookies/cookies.component';

const MOBILE = 780;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, NavigationComponent, CookiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  isMenuOpen = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private ya: YandexAnalyticsService) {
    this.ya.init();
  }

  toggleMenu() {
    if(isPlatformBrowser(this.platformId) && window.innerWidth > MOBILE)
      return;

    this.isMenuOpen = !this.isMenuOpen;
  }

  getMenuAvailable() {
    if(isPlatformBrowser(this.platformId) && window.innerWidth > MOBILE)
      return true;
    else return this.isMenuOpen;
  }

  setToggle($event: boolean) {
    this.isMenuOpen = $event;
  }
}
