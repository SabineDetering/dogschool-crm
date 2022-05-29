import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SearchFilterPipe } from 'src/pipes/search-filter.pipe';
import { SortJSONArrayPipe } from 'src/pipes/sort-jsonarray.pipe';

import { TrainingOverviewComponent } from './training-overview.component';

describe('TrainingOverviewComponent', () => {
  let component: TrainingOverviewComponent;
  let fixture: ComponentFixture<TrainingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [
        TrainingOverviewComponent,
        SortJSONArrayPipe,
        SearchFilterPipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
