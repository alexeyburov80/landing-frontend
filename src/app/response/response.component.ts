import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-response',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss'
})
export class ResponseComponent {
  public contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {
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
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Here you would typically send the form data to your backend
      alert('Форма успешно отправлена!');
      this.contactForm.reset();
      // Reset contacts array to one field
      while (this.contacts.length !== 0) {
        this.contacts.removeAt(0);
      }
      this.contacts.push(this.createContactField());
    }
  }
}
