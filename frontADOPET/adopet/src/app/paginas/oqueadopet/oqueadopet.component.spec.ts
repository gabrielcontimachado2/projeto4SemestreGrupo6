import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OqueadopetComponent } from './oqueadopet.component';

describe('OqueadopetComponent', () => {
  let component: OqueadopetComponent;
  let fixture: ComponentFixture<OqueadopetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OqueadopetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OqueadopetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
