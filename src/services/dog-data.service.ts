import { Injectable, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ClientDataService } from './client-data.service';


@Injectable({
  providedIn: 'root'
})
export class DogDataService implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Dog>;
  dogs$: Observable<Dog[]>;
  dogs: Dog[];

  constructor(private readonly firestore: AngularFirestore, private clientData: ClientDataService) {

    this.itemsCollection = this.firestore.collection<Dog>('dogs');
    this.dogs$ = this.itemsCollection.valueChanges({ idField: 'dogID' });
  }

  ngOnInit(): void {
    this.dogs$.subscribe(changes => {
      this.dogs = changes.map(this.addClientData);
    });
    console.log('dogs', this.dogs);
  }


  addClientData(d) {
    let dog = new Dog(d);
    for (let i = 0; i < dog.ownerIds.length; i++) {
      dog.ownerData.push(this.clientData.getClientById(dog.ownerIds[i]));
    }
    console.log(dog);
    return dog;
}


saveDog(dog) {
  this.itemsCollection.doc().set(dog);
}

}
