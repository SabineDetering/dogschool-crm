import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallDogCardComponent } from './small-dog-card.component';

describe('SmallDogCardComponent', () => {
  let component: SmallDogCardComponent;
  let fixture: ComponentFixture<SmallDogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallDogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallDogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
