import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SearchFilterPipe } from 'src/pipes/search-filter.pipe';
import { SortJSONArrayPipe } from 'src/pipes/sort-jsonarray.pipe';

import { ClientOverviewComponent } from './client-overview.component';

describe('ClientOverviewComponent', () => {
  let component: ClientOverviewComponent;
  let fixture: ComponentFixture<ClientOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, AngularFireModule.initializeApp(environment.firebase)],
      declarations: [
        ClientOverviewComponent,
        SortJSONArrayPipe,
        SearchFilterPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
