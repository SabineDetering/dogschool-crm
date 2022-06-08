import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/models/client.class';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dialog-add-edit-client',
  templateUrl: './dialog-add-edit-client.component.html',
  styleUrls: ['./dialog-add-edit-client.component.scss']
})


export class DialogAddEditClientComponent implements OnInit {


  public client: Client;
  availableNumber: number;

  constructor(
    public addClientDialogRef: MatDialogRef<DialogAddEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Client,
    private Data: DataService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {

    if (this.dialogData) {
      this.client = new Client(this.dialogData);
    } else {
      this.client = new Client();
    }

    this.Data.availableNumber$.subscribe(changes => {
      this.availableNumber = changes.availableNumber;
    });
  }


  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  
  saveClient() {
    if (!this.client.clientNumber) {
      this.client.clientNumber = this.availableNumber;
      this.Data.saveNumber(this.availableNumber + 1);
      this.openSnackBar('New client has been saved.');
    } else {
      this.openSnackBar('Client changes have been saved.');
    }
    this.Data.saveClient(this.client.toJSON(), this.client.clientID);
  }

}
