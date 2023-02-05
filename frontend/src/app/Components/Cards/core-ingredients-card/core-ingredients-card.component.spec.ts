import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreIngredientsCardComponent } from './core-ingredients-card.component';

describe('CoreIngredientsCardComponent', () => {
  let component: CoreIngredientsCardComponent;
  let fixture: ComponentFixture<CoreIngredientsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreIngredientsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreIngredientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
