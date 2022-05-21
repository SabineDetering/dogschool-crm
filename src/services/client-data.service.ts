import { Injectable, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  private itemsCollection: AngularFirestoreCollection<Client>;
  public clients$: Observable<Client[]>;

  constructor(private readonly firestore: AngularFirestore) {

    this.itemsCollection = this.firestore.collection<Client>('clients');
    this.clients$ = this.itemsCollection.valueChanges({ idField: 'clientID' });
  }


  saveClient(client) {
    this.itemsCollection.doc().set(client);
  }

  
}
