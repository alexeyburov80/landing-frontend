import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-socials',
  imports: [CommonModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss',
})
export class SocialsComponent {
  @Input() data!: [{
    name: string;
    href: string;
    icon: string;
  }];
}
