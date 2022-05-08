import { Component, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit {

  client = new Client;

  constructor(public dialog: MatDialog) { }

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

