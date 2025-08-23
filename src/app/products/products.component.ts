import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnDestroy, PLATFORM_ID} from '@angular/core';
import {AsyncPipe, isPlatformBrowser, NgForOf, NgIf} from '@angular/common';
import {finalize, Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {JsonViewerComponent} from '../json-viewer/json-viewer.component';
import {register} from 'swiper/element/bundle';
import {LoadingComponent} from '../loading/loading.component';
import {DownloadService} from '../services/download.service';

register();


@Component({
  selector: 'app-products',
  imports: [NgForOf, JsonViewerComponent, AsyncPipe, NgIf, LoadingComponent],
  templateUrl: './products.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  productItems$: Observable<any[]>;
  private timerId!: any;
  isLoading = false;
  error: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private api: ApiService,
              private downloadService: DownloadService) {
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

  getJSON(title: string) {
    if(!title.length) {
      return;
    }
    this.isLoading = true;

    this.error = null;
    console.log('getJSON', title);
    this.downloadService.downloadFile(
      `assets/files/${title}`,
      title
    ).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      error: (error) => {
        this.error = 'Не удалось скачать файл';
        console.error(error);
      }
    });
  }
}
