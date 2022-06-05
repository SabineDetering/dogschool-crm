import { Injectable } from '@angular/core';
import { Dog } from 'src/models/dog.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Training } from 'src/models/training.class';


export interface AvailableNumberI { availableNumber: number; }
export interface Subjects { subjectList: string[]; }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private availableNumberCollection: AngularFirestoreCollection<AvailableNumberI>;
  availableNumber$: Observable<AvailableNumberI>;

  private clientCollection: AngularFirestoreCollection<Client>;
  public clients$: Observable<Client[]>;

  private dogCollection: AngularFirestoreCollection<Dog>;
  public dogs$: Observable<Dog[]>;

  private trainingCollection: AngularFirestoreCollection<Training>;
  public trainings$: Observable<Training[]>;

  private subjectCollection: AngularFirestoreCollection<Subjects>;
  public subjects$: Observable<Subjects>;


  constructor(private readonly firestore: AngularFirestore) {


    this.availableNumberCollection = this.firestore.collection<AvailableNumberI>('available-client-number');
    this.availableNumber$ = this.availableNumberCollection.doc('available-number').valueChanges();

    this.clientCollection = this.firestore.collection<Client>('clients');
    this.clients$ = this.clientCollection.valueChanges({ idField: 'clientID' });

    this.dogCollection = this.firestore.collection<Dog>('dogs');
    this.dogs$ = this.dogCollection.valueChanges({ idField: 'dogID' });

    this.trainingCollection = this.firestore.collection<Training>('trainings');
    this.trainings$ = this.trainingCollection.valueChanges({ idField: 'trainingID' });

    this.subjectCollection = this.firestore.collection<Subjects>('subjects');
    this.subjects$ = this.subjectCollection.doc('subjects').valueChanges();
  }


  saveNumber(number) {
    this.availableNumberCollection.doc('available-number').set({ 'availableNumber': number });
  }

  saveClient(client: any, id?: string) {
    if (id) {
      this.clientCollection.doc(id).set(client);
    } else {
      this.clientCollection.doc().set(client);
    }
  }


  saveDog(dog: any, id?: string) {
    if (id) {
      this.dogCollection.doc(id).set(dog);
    } else {
      this.dogCollection.doc().set(dog);
    }
  }


  saveTraining(training: any, id?: string) {
    if (id) {
      this.trainingCollection.doc(id).set(training);
    } else {
      this.trainingCollection.doc().set(training);
    }
  }


  deleteTraining(id: string) {
    this.trainingCollection.doc(id).delete();
  }


  saveSubjects(subjects: string[]) {
    this.subjectCollection.doc('subjects').set({ 'subjectList': subjects });
  }


}
