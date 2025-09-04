import {Component, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ResponseService} from '../services/response.service';
import {LoadingComponent} from '../loading/loading.component';
import {YandexAnalyticsService} from '../services/yandex-analytics.service';
import {Analytics} from '../models/analytics';
import {SeoService} from '../services/seo.service';
import {Subscription, take} from 'rxjs';

@Component({
  selector: 'app-response',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgForOf,
    LoadingComponent
  ],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss'
})
export class ResponseComponent implements OnDestroy {
  public contactForm!: FormGroup;
  isLoading = false;
  subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder,
              private ya: YandexAnalyticsService,
              private seoService: SeoService,
              private responseService: ResponseService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      contacts: this.fb.array([this.createContactField()]),
      description: ['', Validators.required]
    });

    this.ya.sendEvent(Analytics.ResponseEnter);
    this.seoService.setMetatags('Оставить заявку. Напишите нам. Заявка на парсинг сайта. Заказать парсинг.');
  }

  createContactField(): FormGroup {
    return this.fb.group({
      value: ['', Validators.required]
    });
  }

  get contacts(): FormArray {
    return this.contactForm.get('contacts') as FormArray;
  }

  get name() {
    return this.contactForm.get('name')!;
  }

  get description() {
    return this.contactForm.get('description')!;
  }

  addContact(): void {
    this.contacts.push(this.createContactField());
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.contactForm.valid) {
      this.ya.sendEvent(Analytics.ResponseSend);
      const sb = this.responseService.sendForm(this.contactForm.value).pipe(
        take(1)
      ).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log('Успех:', res)
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Ошибка:', err)
        }
      });
      this.subscriptions.push(sb);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
