import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallClientCardComponent } from './small-client-card.component';

describe('SmallClientCardComponent', () => {
  let component: SmallClientCardComponent;
  let fixture: ComponentFixture<SmallClientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallClientCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallClientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
