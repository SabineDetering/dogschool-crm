import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Item { availableNumber: number; }

@Injectable({
  providedIn: 'root'
})  


export class ClientNumberService {

  private itemCollection: AngularFirestoreCollection<Item>;
  availableNumber$:Observable<Item>

  constructor(private firestore: AngularFirestore) {

    this.itemCollection = this.firestore.collection<Item>('available-client-number');
    this.availableNumber$ = this.itemCollection.doc('available-number').valueChanges();  
  }
  
  incrementNumber() {
    
  }

}

