import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioPetComponent } from './anuncio-pet.component';

describe('AnuncioPetComponent', () => {
  let component: AnuncioPetComponent;
  let fixture: ComponentFixture<AnuncioPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
