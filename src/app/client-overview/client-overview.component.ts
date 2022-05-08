import { Component, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit {

  client = new Client;

  clients$: Observable<any[]>;
  clients: Array<any> = [];

  constructor(firestore: Firestore, public dialog: MatDialog) {
    const coll: any = collection(firestore, 'clients');
    this.clients$ = collectionData(coll);
    this.clients$.subscribe((clients) => {
      console.log('updated clients', clients);
      this.clients = clients;
    });
  }



  ngOnInit(): void {
  }


  openAddClientDialog(): void {
    const addClientDialog = this.dialog.open(DialogAddClientComponent);

    addClientDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.client = result;
    });
  }
}

