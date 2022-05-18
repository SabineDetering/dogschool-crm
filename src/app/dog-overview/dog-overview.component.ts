import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
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

  dog :Dog;
  dogs: any[];
  clients: any[];
  tableDogs = [];

  tableColumns = ['name', 'breed', 'age', 'owner1', 'owner2'];

  constructor(public dialog: MatDialog, public dogData: DogDataService, public clientData:ClientDataService) { }

  ngOnInit(): void {
    this.clientData.clients$.subscribe(changes => {
      this.clients = changes;
      console.log(this.clients);
    });

    this.dogData.dogs$.subscribe(changes => {
      this.dogs = changes;
      for (let i = 0; i < this.dogs.length; i++) {
        const dog = this.dogs[i];
        //calculate age in years
        if (dog.birthDate) {
          dog.age = Math.round((Date.now() - dog.birthDate) / 1000 / 60 / 60 / 24 / 365.25 * 10) / 10;
        }
        dog.ownerData1 = this.clients.find(client => client.clientID == dog.owners[0]);
        dog.ownerData2 = this.clients.find(client => client.clientID == dog.owners[1]);
        console.log(dog);
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
