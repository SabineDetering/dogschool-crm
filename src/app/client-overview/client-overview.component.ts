import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
import { Observable } from 'rxjs';
import { ClientDataService } from 'src/services/client-data.service';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

class ClientWithId extends Client {
  clientId: string;
}


@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})

export class ClientOverviewComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  // client = new Client();
  clients: Client[];
  tableClients = [];

  tableColumns = ['clientNumber', 'firstName', 'lastName', 'phone', 'whatsApp', 'email'];

  constructor(public dialog: MatDialog, public clientData: ClientDataService) { }


  ngOnInit(): void {
    this.clientData.clients$.subscribe(changes => {
      this.clients = changes.map(c => new Client(c));
      console.log('clients', this.clients);
      //by default clients are displayed with descending client numbers -> newest client on top
      if (this.clients.length > 0) {
        // not possible to use generateTableData because renderRows is not accepted onInit
        this.tableClients = this.sortClients({ active: 'clientNumber', direction: 'desc' });
      }
    });
  };



  generateTableData(sorting: Sort, filter: string) {
    //filter to be added
    if (sorting) {
      this.tableClients = this.sortClients(sorting);
      this.table.renderRows();
    } else {
      this.tableClients = this.clients;
    }
  }


  sortClients(sortState: Sort) {
    let prop = sortState.active;
    let direction = sortState.direction;
    return this.clients.sort((a, b) => {
      return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
    });
  }


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

