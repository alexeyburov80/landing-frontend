import { Component } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {SeoService} from '../services/seo.service';

@Component({
  selector: 'app-multilink',
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './multilink.component.html',
  styleUrl: './multilink.component.scss'
})
export class MultilinkComponent {
  linkItems$!: Observable<any[]>;
  constructor(private api: ApiService,
              private seoService: SeoService) {
    this.linkItems$ = this.api.getAllLinks();
    this.seoService.setMetatags('Парсинг. Сбор данных из открытых источников. Карта сайта. Главная. Продукты. Контакты. Отклик. Контакты: телефон, телеграм, Avito, Профи.ру, YouDo.  Каналы: telegram,  vk,  dzen,  ok ');
  }
}
