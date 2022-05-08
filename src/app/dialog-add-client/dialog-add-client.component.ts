import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/models/client.class';

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.scss']
})
export class DialogAddClientComponent implements OnInit {

  client = new Client;

  constructor(public addClientDialogRef: MatDialogRef<DialogAddClientComponent>) { }

  onNoClick(): void {
    this.addClientDialogRef.close();
  }
  ngOnInit(): void {
  }

}
