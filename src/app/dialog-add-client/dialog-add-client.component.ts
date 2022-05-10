import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/models/client.class';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.scss']
})


export class DialogAddClientComponent implements OnInit {

  // numberOfClients is incremented with every new client to create clientNumber
  static numberOfClients = 0;
  public client = new Client();
  private ItemsCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore,
    public addClientDialogRef: MatDialogRef<DialogAddClientComponent>) {
    DialogAddClientComponent.numberOfClients++;
    this.client.clientNumber = DialogAddClientComponent.numberOfClients;
  }

  onNoClick(): void {
    this.addClientDialogRef.close();
  }
  ngOnInit(): void {
  }

  saveClient() {
    this.ItemsCollection = this.firestore.collection('clients');
    this.ItemsCollection.doc().set(this.client.toJSON());
  }

}
