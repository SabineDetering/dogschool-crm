import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { TrainingDetailsComponent } from './training-details.component';

describe('TrainingDetailsComponent', () => {
  let component: TrainingDetailsComponent;
  let fixture: ComponentFixture<TrainingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase),
        MatDialogModule
      ],
      declarations: [TrainingDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //function getDetailedAge
  it('should transform 2.65 year to 2.7 months', () => {
    let result = component.getDetailedAge(2.65);
    expect(result).toBe('2.7 years');
  });
  it('should transform 1.001 years to 1 years', () => {
    let result = component.getDetailedAge(1.001);
    expect(result).toBe('1 years');
  });
  it('should transform 1 year to 12 months', () => {
    let result = component.getDetailedAge(1);
    expect(result).toBe('12 months');
  });
  it('should transform 0.5 years to 6 months', () => {
    let result = component.getDetailedAge(0.5);
    expect(result).toBe('6 months');
  });
  it('should transform 0.334 years to 4 months', () => {
    let result = component.getDetailedAge(0.334);
    expect(result).toBe('4 months');
  });
  it('should transform 0.333 years to 17 weeks', () => {
    let result = component.getDetailedAge(0.333);
    expect(result).toBe('17 weeks');
  });
  it('should transform 0.25 years to 13 weeks', () => {
    let result = component.getDetailedAge(0.25);
    expect(result).toBe('13 weeks');
  });
});

