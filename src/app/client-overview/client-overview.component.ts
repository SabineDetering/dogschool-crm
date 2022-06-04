import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditClientComponent } from '../dialog-add-edit-client/dialog-add-edit-client.component';
import { firstValueFrom } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Dog } from 'src/models/dog.class';
import { DataService } from 'src/services/data.service';
import { FilterStringService } from 'src/services/filter-string.service';


@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})

export class ClientOverviewComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  clients: Client[];
  // tableClients = [];
  dogs: Dog[];
  sorting: Sort = { active: 'clientNumber', direction: 'desc' };
  sortProp = 'clientNumber';
  sortDir: string = 'desc';
  searchString: string;

  tableColumns = ['clientNumber', 'firstName', 'lastName', 'phone', 'whatsApp', 'email', 'ownedDogs'];

  constructor(public dialog: MatDialog, public Data: DataService, public filter: FilterStringService) { }


  async ngOnInit(): Promise<void> {

    this.dogs = await firstValueFrom(this.Data.dogs$);
    console.log('dogs for clients', this.dogs);

    this.Data.clients$.subscribe(changes => {
      this.clients = changes.map(c => {
        let client = new Client(c);
        for (let i = 0; i < this.dogs.length; i++) {
          let dog = this.dogs[i];
          if (dog.ownerIds.includes(client.clientID)) {
            client.ownedDogs += (client.ownedDogs.length > 0 ? ', ' : '') + dog.name;
          }
        }
        return client;
      });
    });

    this.filter.filterSource.subscribe(val => {
      this.searchString = val;
    });
  };


  setSorting(sorting: Sort) {
    this.sortProp = sorting.active;
    this.sortDir = sorting.direction;
    this.table.renderRows();
  }


  openAddClientDialog(): void {
    const addClientDialog = this.dialog.open(DialogAddEditClientComponent);
  }

}

