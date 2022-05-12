import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/models/client.class';
import { ClientNumberService } from 'src/services/client-number.service';
import { ClientDataService } from 'src/services/client-data.service';

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.scss']
})


export class DialogAddClientComponent implements OnInit {


  public client = new Client();
  availableNumber: number;

  constructor(
    public addClientDialogRef: MatDialogRef<DialogAddClientComponent>,
    private clientData: ClientDataService,
    private availableClientNumber: ClientNumberService
  ) { }


  onNoClick(): void {
    this.addClientDialogRef.close();
  }
  ngOnInit(): void {
    this.availableClientNumber.availableNumber$.subscribe(changes => {
      this.availableNumber = changes.availableNumber;
    });
  }

  saveClient() {
    this.client.clientNumber = this.availableNumber;
    this.availableClientNumber.saveNumber(this.availableNumber+1);
    this.clientData.saveClient(this.client.toJSON());
  }

}
