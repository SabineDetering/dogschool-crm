import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { ClientDataService } from 'src/services/client-data.service';
import { DogDataService } from 'src/services/dog-data.service';
import { DialogAddDogComponent } from '../dialog-add-dog/dialog-add-dog.component';



@Component({
  selector: 'app-dog-overview',
  templateUrl: './dog-overview.component.html',
  styleUrls: ['./dog-overview.component.scss']
})
export class DogOverviewComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  // dog: Dog;
  // dogs: Dog[];
  // clients: Client[];
  tableDogs: Dog[];

  tableColumns = ['name', 'breed', 'age', 'owner1', 'owner2'];

  constructor(
    public dialog: MatDialog,
    public dogData: DogDataService,
    public clientData: ClientDataService
  ) { }

  ngOnInit(): void {
    //by default dogs are displayed with ascending dog names
    if (this.dogData.dogs.length > 0) {
      // not possible to use generateTableData because renderRows is not accepted onInit
      this.tableDogs = this.sortDogs({ active: 'name', direction: 'asc' });
    }
  };


  openAddDogDialog() {
    const addDogDialog = this.dialog.open(DialogAddDogComponent);
  }


  generateTableData(sorting: Sort, filter: string) {
    //filter to be added
    if (sorting) {
      this.tableDogs = this.sortDogs(sorting);
      this.table.renderRows();
    }
    else {
      this.tableDogs = this.dogData.dogs;
    }
  }


  sortDogs(sortState: Sort) {
    let prop = sortState.active;
    let direction = sortState.direction;
    return this.dogData.dogs.sort((a, b) => {
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
