import { Injectable } from '@angular/core';
import { Dog } from 'src/models/dog.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Training } from 'src/models/training.class';


export interface AvailableNumberI { availableNumber: number; }
export interface Subjects { subjectList: string[]; }
// export interface scheduleHoursI { min: number; max: number; }

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

  // private scheduleHoursCollection: AngularFirestoreCollection<scheduleHoursI>;
  // scheduleHours$: Observable<scheduleHoursI>;


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

    // this.scheduleHoursCollection = this.firestore.collection<scheduleHoursI>('schedule-hours');
    // this.scheduleHours$ = this.scheduleHoursCollection.doc('schedule').valueChanges();
  }


  saveNumber(number) {
    this.availableNumberCollection.doc('available-number').set({ availableNumber: number });
  }

  saveClient(client) {
    this.clientCollection.doc().set(client);
  }


  saveDog(dog) {
    this.dogCollection.doc().set(dog);
  }


  saveTraining(training:any,id?:string) {
    this.trainingCollection.doc(id).set(training);
  }

  saveSubjects(subjects) {
    this.subjectCollection.doc('subjects').set(subjects);
  }


  // saveSchedule(schedule) {
  //   this.scheduleHoursCollection.doc('schedule').set(schedule);
  // }

}
