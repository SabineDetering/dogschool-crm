import { Injectable } from '@angular/core';
import { Client } from 'src/models/client.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Item { id: string; client: Client; }

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  clients$: Observable<Item[]>;

  constructor(private readonly firestore: AngularFirestore) {

    this.itemsCollection = this.firestore.collection<Item>('clients');
    this.clients$ = this.itemsCollection.valueChanges({ idField: 'clientID' });
  }

  saveClient(client) {
    this.itemsCollection.doc().set(client);
  }
  
}
