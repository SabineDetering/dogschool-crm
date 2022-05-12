import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogOverviewComponent } from './dog-overview.component';

describe('DogOverviewComponent', () => {
  let component: DogOverviewComponent;
  let fixture: ComponentFixture<DogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
