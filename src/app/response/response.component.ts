import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ResponseService} from '../services/response.service';
import {LoadingComponent} from '../loading/loading.component';
import {tap} from 'rxjs';

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
export class ResponseComponent {
  public contactForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private responseService: ResponseService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      contacts: this.fb.array([this.createContactField()]),
      description: ['', Validators.required]
    });
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
      this.responseService.sendForm(this.contactForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log('Успех:', res)
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Ошибка:', err)
        }
      });
    }
  }
}
