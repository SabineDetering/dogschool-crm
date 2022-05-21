import { Injectable } from '@angular/core';
import { Dog } from 'src/models/dog.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Training } from 'src/models/training.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private clientCollection: AngularFirestoreCollection<Client>;
  public clients$: Observable<Client[]>;

  private dogCollection: AngularFirestoreCollection<Dog>;
  public dogs$: Observable<Dog[]>;

  private trainingCollection: AngularFirestoreCollection<Training>;
  public trainings$: Observable<Training[]>;
  

  constructor(private readonly firestore: AngularFirestore) {

    this.clientCollection = this.firestore.collection<Client>('clients');
    this.clients$ = this.clientCollection.valueChanges({ idField: 'clientID' });

    this.dogCollection = this.firestore.collection<Dog>('dogs');
    this.dogs$ = this.dogCollection.valueChanges({ idField: 'dogID' });

    this.trainingCollection = this.firestore.collection<Training>('dogs');
    this.trainings$ = this.trainingCollection.valueChanges({ idField: 'dogID' });
  }



  saveClient(client) {
    this.clientCollection.doc().set(client);
  }


  saveDog(dog) {
    this.dogCollection.doc().set(dog);
  }
}
