import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SearchFilterPipe } from 'src/pipes/search-filter.pipe';
import { SortJSONArrayPipe } from 'src/pipes/sort-jsonarray.pipe';

import { DogOverviewComponent } from './dog-overview.component';

describe('DogOverviewComponent', () => {
  let component: DogOverviewComponent;
  let fixture: ComponentFixture<DogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, AngularFireModule.initializeApp(environment.firebase)],
      declarations: [
        DogOverviewComponent,
        SortJSONArrayPipe,
        SearchFilterPipe
      ],
      providers: []
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
