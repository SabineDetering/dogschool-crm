import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
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
  sorting: Sort = { active: 'clientNumber', direction: 'desc'
};
  sortProp = 'clientNumber';
  sortDir: string = 'desc';
  searchString: string;

  tableColumns = ['clientNumber', 'firstName', 'lastName', 'phone', 'whatsApp', 'email', 'ownedDogs'];

  constructor(public dialog: MatDialog, public Data: DataService, public filter: FilterStringService) { }


  async ngOnInit(): Promise<void> {

    this.dogs = await firstValueFrom(this.Data.dogs$);
    console.log('dogs for clients', this.dogs);

    this.Data.clients$.subscribe(changes => {
      this.clients = changes.map(c => new Client(c));

      this.clients.forEach(client => {
        for (let i = 0; i < this.dogs.length; i++) {
          let dog = this.dogs[i];
          if (dog.ownerIds.includes(client.clientID)) {
            client.ownedDogs += (client.ownedDogs.length > 0 ? ', ' : '') + dog.name;
          }
        }
      });
      // console.log('clients', this.clients);
      //by default clients are displayed with descending client numbers -> newest client on top
      // if (this.clients.length > 0) {
      // not possible to use generateTableData because renderRows is not accepted onInit
      // this.tableClients = this.sortClients({ active: 'clientNumber', direction: 'desc' });
      // }      
    });

    this.filter.filterSource.subscribe(val => {
      this.searchString = val;
    });
  };



  // generateTableData(sorting: Sort, filter: string) {
  //   //filter to be added
  //   if (sorting) {
  //     this.tableClients = this.sortClients(sorting);
  //     this.table.renderRows();
  //   } else {
  //     this.tableClients = this.clients;
  //   }
  // }


  setSorting(sorting: Sort) {
    this.sortProp = sorting.active;
    this.sortDir = sorting.direction;
    this.table.renderRows();
  }


  // sortClients(sortState: Sort) {
  //   let prop = sortState.active;
  //   let direction = sortState.direction;
  //   return this.clients.sort((a, b) => {
  //     return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
  //   });
  // }


  openAddClientDialog(): void {
    const addClientDialog = this.dialog.open(DialogAddClientComponent);
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

