import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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
  dogs: Dog[];
  clients: Client[];
  tableDogs: Dog[];

  tableColumns = ['name', 'breed', 'age', 'owner1', 'owner2'];

  constructor(
    public dialog: MatDialog,
    public dogData: DogDataService,
    public clientData: ClientDataService
  ) { }

  async ngOnInit(): Promise<void> {

    // this.clientData.clients$.subscribe(changes => {
    //   this.clients = changes.map(c => new Client(c));
    // });
    this.clients = await firstValueFrom(this.clientData.clients$);
    console.log('clients for dogs', this.clients);

    this.dogData.dogs$.subscribe(changes => {
      this.dogs = changes.map(d => new Dog(d));

      this.dogs.forEach(dog => {
        for (let i = 0; i < dog.ownerIds.length; i++) {
          dog.ownerData.push(this.getClientById(dog.ownerIds[i]));
        }
      });
      console.log('dogs', this.dogs);
      //by default dogs are displayed with ascending dog names
      if (this.dogs.length > 0) {
        // not possible to use generateTableData because renderRows is not accepted onInit
        this.tableDogs = this.sortDogs({ active: 'name', direction: 'asc' });
      }
    });
  };


  getClientById(id: string): Client {
    return this.clients.find(client => client.clientID == id);
  }


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
      this.tableDogs = this.dogs;
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
