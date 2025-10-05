import { Component } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
