import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDogComponent } from './dialog-add-dog.component';

describe('DialogAddDogComponent', () => {
  let component: DialogAddDogComponent;
  let fixture: ComponentFixture<DialogAddDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
