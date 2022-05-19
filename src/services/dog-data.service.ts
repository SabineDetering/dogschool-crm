import { Injectable } from '@angular/core';
import { Dog } from 'src/models/dog.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DogDataService {

  private itemsCollection: AngularFirestoreCollection<Dog>;
  dogs$: Observable<Dog[]>;

  constructor(private readonly firestore: AngularFirestore) {
    this.itemsCollection = this.firestore.collection<Dog>('dogs');
    this.dogs$ = this.itemsCollection.valueChanges({ idField: 'dogID' });
  }


saveDog(dog) {
  this.itemsCollection.doc().set(dog);
}

}
