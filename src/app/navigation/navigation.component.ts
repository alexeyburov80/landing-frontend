import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  private timerId!: any;
  @Input() isMenuOpen = false;
  @Output() toggleChange = new EventEmitter();
  navItems = [
    { label: 'ГЛАВНАЯ', isActive: true, url: '/' },
    { label: 'ПРОДУКТЫ', isActive: false, url: 'products' },
    { label: 'КОНТАКТЫ', isActive: false, url: 'contact' },
    { label: 'ОТКЛИК', isActive: false, url: 'response' }
  ];
  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit() {
    this.timerId = setTimeout(() => this.updateIndicatorPosition(), 0);
  }

  selectItem(selectedItem: any) {
    this.navItems.forEach(item => item.isActive = false);
    selectedItem.isActive = true;
    this.updateIndicatorPosition();
    this.toggleMenu();
    this.router.navigate([selectedItem.url]);
  }

  updateIndicatorPosition() {
    const activeIndex = this.navItems.findIndex(item => item.isActive);
    if (isPlatformBrowser(this.platformId) && activeIndex >= 0) {
      const indicator = document.querySelector('.nav-indicator') as HTMLElement;
      const items = document.querySelectorAll('.nav-item');
      const activeItem = items[activeIndex] as HTMLElement;

      if (indicator && activeItem) {
        indicator.style.left = `${activeItem.offsetLeft}px`;
        indicator.style.width = `${activeItem.offsetWidth}px`;
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleChange.emit(this.isMenuOpen);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
