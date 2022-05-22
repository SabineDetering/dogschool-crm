import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/models/client.class';
import { DataService } from 'src/services/data.service';

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
    private Data: DataService
  ) { }


  ngOnInit(): void {
    this.Data.availableNumber$.subscribe(changes => {
      this.availableNumber = changes.availableNumber;
    });
  }

  saveClient() {
    this.client.clientNumber = this.availableNumber;
    this.Data.saveNumber(this.availableNumber+1);
    this.Data.saveClient(this.client.toJSON());
  }

}
