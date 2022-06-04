import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTrainingCardComponent } from './small-training-card.component';

describe('SmallTrainingCardComponent', () => {
  let component: SmallTrainingCardComponent;
  let fixture: ComponentFixture<SmallTrainingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallTrainingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallTrainingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
