import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Client } from 'src/models/client.class';

import { SmallClientCardComponent } from './small-client-card.component';

describe('SmallClientCardComponent', () => {
  let component: SmallClientCardComponent;
  let fixture: ComponentFixture<SmallClientCardComponent>;
  let expectedClient: Client;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [SmallClientCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallClientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expectedClient = new Client({
      clientNumber: 1,
      firstName: 'Max',
      lastName: 'fasdf',
      street: '',
      zipCode: '12345',
      city: 'KA',
      email: '',
      landlinePhone: { areaCode: '', number: '' },
      mobilePhone: { areaCode: '', number: '' },
      whatsApp: false,
      dogIds: [],
      clientID: '123dsaf'
    });

    component.client = expectedClient;
    fixture.detectChanges();

  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should show name in header', () => {
    const nameDebug: DebugElement = fixture.debugElement;
    const nameElement = nameDebug.query(By.css('name'));
    const name: HTMLElement = nameElement.nativeElement;
    const expectedName = expectedClient.firstName + ' ' + expectedClient.lastName;
    expect(name).toContain(expectedName);
  })
});
