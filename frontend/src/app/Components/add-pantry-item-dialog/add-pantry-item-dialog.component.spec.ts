import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPantryItemDialogComponent } from './add-pantry-item-dialog.component';

describe('AddPantryItemDialogComponent', () => {
  let component: AddPantryItemDialogComponent;
  let fixture: ComponentFixture<AddPantryItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPantryItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPantryItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
