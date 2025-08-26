import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {Analytics} from '../models/analytics';
import {environment} from '../../environments/environment';

declare let ym: Function;

@Injectable({
  providedIn: 'root'
})
export class YandexAnalyticsService {

  constructor(@Inject(DOCUMENT) private readonly doc: any) {
  }

  public init(): void {
    if (environment.production) {
      const s = this.doc.createElement('script');
      s.type = 'text/javascript';
      s.innerHTML = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${103838337}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});`;
      const head = this.doc.getElementsByTagName('head')[0];
      head.appendChild(s);

      const nos = this.doc.createElement('noscript');
      const div = this.doc.createElement('div');
      const img = this.doc.createElement('img');
      img.src = `https://mc.yandex.ru/watch/${103838337}`;
      img.style.position = 'absolute';
      img.style.left = '9999px';
      img.alt = ' ';
      div.appendChild(img);
      nos.appendChild(div);
      head.appendChild(nos);
    }
  }

  public enabled(): boolean {
    return typeof ym === 'function';
  }

  public sendEvent(event: Analytics | string): void {
    if (this.enabled()) {
      ym(103838337, 'reachGoal', event);
    }
  }
}
