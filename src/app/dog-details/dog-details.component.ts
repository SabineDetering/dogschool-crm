import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { DataService } from 'src/services/data.service';
import { DialogAddEditDogComponent } from '../dialog-add-edit-dog/dialog-add-edit-dog.component';
import { DialogAddEditTrainingComponent } from '../dialog-add-edit-training/dialog-add-edit-training.component';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent implements OnInit {

  dog: Dog;
  dogID: string;
  clients: Client[];
  trainings: Training[];
  constructor(
    private route: ActivatedRoute,
    private Data: DataService,
    public dialog: MatDialog,
    private location: Location) { }


  async ngOnInit(): Promise<void> {

    this.trainings = await firstValueFrom(this.Data.trainings$);
    this.clients = await firstValueFrom(this.Data.clients$);

    this.route.params.subscribe(params => {
      this.dogID = params['dogID'];
    });

    //get the selected client and add the corresponding trainings and dog data
    this.Data.dogs$.subscribe(changes => {
      this.dog = changes
        .filter((d) => (d.dogID == this.dogID))
        .map(dog => {
          dog = new Dog(dog);
          console.log('dog', dog);
          dog.trainingData = this.getTrainingDataByDogId(dog.dogID);
          dog.trainingData.forEach(training => training.clientName = this.getClientNameById(training.clientID));
          for (let i = 0; i < dog.ownerIds.length; i++) {
            dog.ownerData.push(this.getClientDataById(dog.ownerIds[i]));
          }
          return dog;
        })[0];
      console.log('dog', this.dog);
    });
  }

  ngOnChanges() {
    console.log('changes', this.trainings);
  }


  /**
   * returns all training data saved for the given dogID sorted by descending date
   * @param id - dogID
   * @returns training data for the given dogID
   */
  getTrainingDataByDogId(id: string): Training[] {
    let trainingData = this.trainings.filter(training => training.dogID == id);
    return this.sortJSONArray(trainingData, 'date', 'desc');
  }


  /**
   * @param id - dogID
   * @returns client data for the given clientID
   */
  getClientDataById(id: string): Client {
    return this.clients.find(client => client.clientID == id);
  }


  /**
   * @param id - clientID
   * @returns client firstname and lastname for the given clientID
   */
  getClientNameById(id: string): string {
    let client = this.clients.filter(client => client.clientID == id)[0];
    return client.firstName + ' ' + client.lastName;
  }


  /**
   * @param array - JSON array 
   * @param prop  - name of the property to sort
   * @param direction - sorting direction, either 'asc' or 'desc'
   * @returns sorted JSON array 
   */
  sortJSONArray(array: any[], prop: string, direction: 'desc' | 'asc'): any[] {
    return array.sort((a, b) => {
      return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
    });
  }


  /**
   * close details view and go back to previous page
   */
  closeDetails() {
    this.location.back();
  }


  editDog() {
    this.dialog.open(DialogAddEditDogComponent, {
      height: '90vh',
      width: '600px',
      data: this.dog
    });
  }


  addTraining() {
    const dialogRef = this.dialog.open(DialogAddEditTrainingComponent, {
      height: '90vh',
      width: '600px',
      data: { dogID: this.dog.dogID }
    });
    dialogRef.afterClosed().subscribe(r => window.location.reload());
  }

}