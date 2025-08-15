import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitesComponent } from './requisites.component';

describe('RequisitesComponent', () => {
  let component: RequisitesComponent;
  let fixture: ComponentFixture<RequisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
