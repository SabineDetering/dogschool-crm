import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Dog } from 'src/models/dog.class';
import { DogDataService } from 'src/services/dog-data.service';
import { DialogAddDogComponent } from '../dialog-add-dog/dialog-add-dog.component';

@Component({
  selector: 'app-dog-overview',
  templateUrl: './dog-overview.component.html',
  styleUrls: ['./dog-overview.component.scss']
})
export class DogOverviewComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  dog = new Dog;
  dogs: any[];
  tableDogs = [];

  tableColumns = ['name', 'breed', 'age', 'owner'];

  constructor(public dialog: MatDialog, public dogData: DogDataService) { }

  ngOnInit(): void {
    this.dogData.dogs$.subscribe(changes => {
      this.dogs = changes;
      //by default clients are displayed with descending client numbers -> newest client on top
      this.generateTableData({ active: 'name', direction: 'asc' }, '');
    });
  }


  openAddDogDialog() {
    const addDogDialog = this.dialog.open(DialogAddDogComponent);
  }


  generateTableData(sorting: Sort, filter: string) {
    this.tableDogs = this.dogs;
    if (sorting) {
      this.tableDogs = this.sortDogs(sorting);
      this.table.renderRows();
    }
  }


  sortDogs(sortState: Sort) {
    let prop = sortState.active;
    let direction = sortState.direction;
    return this.dogs.sort((a, b) => {
      return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
    });
  }


  /**
  * show detailed data for selected row
  * @param row 
  */
  showRow(row: any) {
    console.log(row);
    // to be completed
  }


}
