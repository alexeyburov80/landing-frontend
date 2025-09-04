import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilinkComponent } from './multilink.component';

describe('MultilinkComponent', () => {
  let component: MultilinkComponent;
  let fixture: ComponentFixture<MultilinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultilinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultilinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
