import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToFamilyComponent } from './add-user-to-family.component';

describe('AddUserToFamilyComponent', () => {
  let component: AddUserToFamilyComponent;
  let fixture: ComponentFixture<AddUserToFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToFamilyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
