import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Dog } from 'src/models/dog.class';

import { DialogAddEditDogComponent } from './dialog-add-edit-dog.component';

describe('DialogAddEditDogComponent', () => {
  let component: DialogAddEditDogComponent;
  let fixture: ComponentFixture<DialogAddEditDogComponent>;
  let MockDialogData: Partial<Dog>;

  beforeEach(() => {
    // mock Dialog Data for test purposes
    MockDialogData = {
      name: '',
      birthDate: 12354566,
      age: 4.1,
      chipNumber: '',
      color: '',
      gender: 'male',
      castrated: false,
      breed: 'asdf',
      notes: '',
      ownerIds: ['5555661fasdg'],
      dogID: '123dsaf'
    };
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [DialogAddEditDogComponent],
      providers: [{ provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: MockDialogData }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEditDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
