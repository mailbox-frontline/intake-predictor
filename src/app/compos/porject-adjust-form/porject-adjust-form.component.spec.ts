import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorjectAdjustFormComponent } from './porject-adjust-form.component';

describe('PorjectAdjustFormComponent', () => {
  let component: PorjectAdjustFormComponent;
  let fixture: ComponentFixture<PorjectAdjustFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorjectAdjustFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorjectAdjustFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
