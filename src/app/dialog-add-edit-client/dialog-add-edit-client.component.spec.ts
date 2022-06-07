import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Client } from 'src/models/client.class';

import { DialogAddEditClientComponent } from './dialog-add-edit-client.component';

describe('DialogAddEditClientComponent', () => {
  let component: DialogAddEditClientComponent;
  let fixture: ComponentFixture<DialogAddEditClientComponent>;
  let MockDialogData: Partial<Client>;

  beforeEach(() => {
    // mock Dialog Data for test purposes
    MockDialogData = {
      clientNumber: 1,
      firstName: '',
      lastName: '',
      street: '',
      zipCode: '12345',
      city: 'KA',
      email : '',
      landlinePhone: { areaCode: '', number: '' },
      mobilePhone: { areaCode: '', number: '' },
      whatsApp: false,
      dogIds: [],
      clientID: '123dsaf'
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [DialogAddEditClientComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: MockDialogData }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // dataInjector = TestBed.inject(MAT_DIALOG_DATA)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
