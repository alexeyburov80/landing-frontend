import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GeoLocation } from '../models/geolocation';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private location: Location,
              private http: HttpClient) { }

  getReferrer(): string | null {
    return document.referrer || null;
  }

  // Определение поискового запроса
  getSearchQuery(): string | null {
    const referrer = this.getReferrer();
    if (!referrer) return null;

    try {
      const url = new URL(referrer);
      const host = url.hostname;

      if (host.match(/google\.|bing\.|duckduckgo\./))
        return url.searchParams.get('q');

      console.log(url);
      console.log(host);

      if (host.includes('yandex.'))
        return url.searchParams.get('text');

    } catch {
      return null;
    }
    return null;
  }

  // Получение UTM-меток
  getUtmParams(): Record<string, string> {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source') || 'direct',
      medium: params.get('utm_medium') || 'none',
      campaign: params.get('utm_campaign') || 'none',
      term: params.get('utm_term') || '',
    };
  }

  // Получение геолокации через IP
  getUserLocation() {
    return this.http.get<GeoLocation>('https://ipapi.co/json/');
  }
}
