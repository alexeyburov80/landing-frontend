import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {YandexAnalyticsService} from '../services/yandex-analytics.service';
import {Analytics} from '../models/analytics';
import {SeoService} from '../services/seo.service';

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
  constructor(private ya: YandexAnalyticsService,
              private seoService: SeoService,
              private api: ApiService) {
    this.contactItems$ = this.api.getContacts();
    this.ya.sendEvent(Analytics.Contacts);
    this.seoService.setMetatags('Наши контакты. Напишите нам для быстрого ответа.Телефон: +79695214640. Телеграм: +79695214640. Avito. Профи.ру. YouDo');
  }
}
