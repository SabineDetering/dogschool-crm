import { Injectable, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  private itemsCollection: AngularFirestoreCollection<Client>;
  private clients$: Observable<Client[]>;
  public clients: Client[];

  constructor(private readonly firestore: AngularFirestore) {

    this.itemsCollection = this.firestore.collection<Client>('clients');
    this.clients$ = this.itemsCollection.valueChanges({ idField: 'clientID' });

    this.clients$.subscribe(changes => {
      this.clients = changes.map(c => new Client(c));
      console.log('clients', this.clients);
    });
  }



  saveClient(client) {
    this.itemsCollection.doc().set(client);
  }

  getClientById(id:string) {
   return this.clients.find(client => client.clientID == id);
  }
  
}
