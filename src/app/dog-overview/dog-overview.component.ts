import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { toUnicode } from 'punycode';
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
      for (let i = 0; i < this.dogs.length; i++) {
        const dog = this.dogs[i];
        console.log('now', Date.now(), 'birthDate', dog.birthDate);
        dog.age = Math.round((Date.now() - dog.birthDate) / 1000 / 60 / 60 / 24 / 365.25 * 10) / 10;
      }
      //by default dogs are displayed with ascending dog names
      if (this.dogs.length > 0) {
        // not possible to use generateTableData because renderRows is not accepted onInit
        this.tableDogs = this.sortDogs({ active: 'name', direction: 'asc' });
      }
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
