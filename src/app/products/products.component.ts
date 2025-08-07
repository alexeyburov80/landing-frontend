import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnDestroy, PLATFORM_ID} from '@angular/core';
import {AsyncPipe, isPlatformBrowser, NgForOf} from '@angular/common';
import {Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {JsonViewerComponent} from '../json-viewer/json-viewer.component';
import {register} from 'swiper/element/bundle';

register();


@Component({
  selector: 'app-products',
  imports: [NgForOf, JsonViewerComponent, AsyncPipe],
  templateUrl: './products.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  productItems$: Observable<any[]>;
  private timerId!: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private api: ApiService) {
    this.productItems$ = this.api.getProducts();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.timerId = setTimeout(() => {
        const swiperEl = document.querySelector('swiper-container');

        if (swiperEl) {
          Object.assign(swiperEl, {
            spaceBetween: 4,
            slidesPerView: 1,
            centeredSlides: true,
            initialSlide: 0,
            loop: true,
            loopAdditionalSlides: 2, // Добавляет копии слайдов для плавного loop
            watchSlidesProgress: true,
            resizeObserver: true,
            watchOverflow: true,
            breakpoints: {
              640: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 4,
              },
              768: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 4,
              },
              1024: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 4,
              },
            },
          });

          swiperEl.initialize();
        }
      }, 300);
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
