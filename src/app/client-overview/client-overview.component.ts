import { Component, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
import { Firestore, collectionData, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit {

  client = new Client;

  clients$: Observable<any[]>;

  constructor(firestore: Firestore, public dialog: MatDialog) {
    const coll: any = collection(firestore, 'clients');
    this.clients$ = collectionData(coll);
    this.clients$.subscribe((clients) => {
      clients.forEach((client)=>{
        console.log('updated clients', client, 'id', client.idField); //id undefined
      }
   )});


    // const querySnapshot = await getDocs(collection(db, "cities"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // const q = query(collection(firestore, "clients"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   console.log('updated clients', querySnapshot);
    //   this.clients = clients;
    // });

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

