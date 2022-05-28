import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { DataService } from 'src/services/data.service';
import { FilterStringService } from 'src/services/filter-string.service';
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
  // tableDogs: Dog[];

  sortProp = 'name';
  sortDir: string = 'asc';
  searchString: string;

  tableColumns = ['name', 'breed', 'age', 'owner1', 'owner2'];

  constructor(
    public dialog: MatDialog,
    public Data: DataService,
    public filter: FilterStringService
  ) { }

  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.Data.clients$);

    this.Data.dogs$.subscribe(changes => {
      this.dogs = changes.map(d=> {
        let dog = new Dog(d);
        for (let i = 0; i < dog.ownerIds.length; i++) {
          dog.ownerData.push(this.getClientById(dog.ownerIds[i]));
        }
        return dog;
      });

        // //by default dogs are displayed with ascending dog names
        // if (this.dogs.length > 0) {
        //   // not possible to use generateTableData because renderRows is not accepted onInit
        //   this.tableDogs = this.sortDogs({ active: 'name', direction: 'asc' });
        // }        
      // });
    });

    this.filter.filterSource.subscribe(val => {
      this.searchString = val;
    });
  }


  getClientById(id: string): Client {
    return this.clients.find(client => client.clientID == id);
  }


  openAddDogDialog() {
    const addDogDialog = this.dialog.open(DialogAddDogComponent);
  }


  setSorting(sorting: Sort) {
    console.log(sorting);
    this.sortProp = sorting.active;
    this.sortDir = sorting.direction;
    this.table.renderRows();
  }

}
