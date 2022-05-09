import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/models/client.class';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.scss']
})
  

export class DialogAddClientComponent implements OnInit {

  client = new Client;



  constructor(private firestore: Firestore, public addClientDialogRef: MatDialogRef<DialogAddClientComponent>) {
    const coll:any = collection(firestore, 'clients');
     }

  onNoClick(): void {
    this.addClientDialogRef.close();
  }
  ngOnInit(): void {
  }

  saveClient(value:any) {
    console.log(value);
    const coll: any = collection(this.firestore, 'clients');
    setDoc(doc(coll), this.client.toJSON());    
  }

}
