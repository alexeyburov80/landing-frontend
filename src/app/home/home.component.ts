import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs';
import {SocialsComponent} from './socials/socials.component';
import {YandexAnalyticsService} from '../services/yandex-analytics.service';
import {Analytics} from '../models/analytics';
import {SeoService} from '../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [NgIf, AsyncPipe, SocialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public data$: Observable<any>;

  constructor(private ya: YandexAnalyticsService,
              private seoService: SeoService,
              private api: ApiService) {
    this.data$ = this.api.getHome();
    this.ya.sendEvent(Analytics.Home);
    this.seoService.setMetatags('Парсинг. Сбор данных из открытых источников. Парсинг сайтов. Парсинг данных.');
  }
}
