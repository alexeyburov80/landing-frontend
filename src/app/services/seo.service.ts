import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GeoLocation } from '../models/geolocation';
import {Meta} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private readonly meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'BR.PARSING. Сбор данных из открытых источников' });
  }

  public setMetatags(content: string): void {
    this.meta.removeTag('description');
    this.meta.updateTag({ name: 'description', content });
  }

}
