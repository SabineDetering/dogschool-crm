import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { Location } from '@angular/common';
import { DataService } from 'src/services/data.service';
import { DialogAddEditClientComponent } from '../dialog-add-edit-client/dialog-add-edit-client.component';
import { DialogAddEditTrainingComponent } from '../dialog-add-edit-training/dialog-add-edit-training.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnChanges {

  client: Client;
  clientID: string;
  dogs: Dog[];
  trainings: Training[];
  constructor(
    private route: ActivatedRoute,
    private Data: DataService,
    public dialog: MatDialog,
    private location: Location) { }


  async ngOnInit(): Promise<void> {

    this.trainings = await firstValueFrom(this.Data.trainings$);
    this.dogs = await firstValueFrom(this.Data.dogs$);

    this.route.params.subscribe(params => {
      this.clientID = params['clientID'];
    });

    //get the selected client and add the corresponding trainings and dog data
    this.Data.clients$.subscribe(changes => {
      this.client = changes
        .filter((c) => (c.clientID == this.clientID))
        .map(client => {
          client = new Client(client);
          client.trainingData = this.getTrainingDataByClientId(client.clientID);
          client.trainingData.forEach(training => training.dogName = this.getDogNameById(training.dogID));
          client.dogData = this.getDogDataByClientId(client.clientID);
          return client;
        })[0];
      console.log('client', this.client)
    });
  }

  ngOnChanges() {
    console.log('changes', this.trainings);
  }


  /**
   * returns all training data saved for the given clientID sorted by descending date
   * @param id - clientID
   * @returns training data for the given clientID
   */
  getTrainingDataByClientId(id: string): Training[] {
    let trainingData = this.trainings.filter(training => training.clientID == id);
    return this.sortJSONArray(trainingData, 'date', 'desc');
  }


  /**
   * returns data of all dogs that are owned by the given clientID
   * @param id - clientID
   * @returns dog data for the given clientID
   */
  getDogDataByClientId(id: string): Dog[] {
    return this.dogs
      .filter(dog => dog.ownerIds.includes(id))
      .map(dog => new Dog(dog));
  }

  /**
   * @param id - dogID
   * @returns dog name for the given dogID
   */
  getDogNameById(id: string): string {
    return this.dogs
      .filter(dog => dog.dogID == id)[0].name;
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


  /**
   * open dialog to edit all client details
   */
  editClient() {
    this.dialog.open(DialogAddEditClientComponent, {
      height: '90vh',
      width: '600px',
      data: this.client
    });
  }

  addTraining() {
    const dialogRef = this.dialog.open(DialogAddEditTrainingComponent, {
      height: '90vh',
      width: '600px',
      data: { clientID: this.client.clientID }
    });
    dialogRef.afterClosed().subscribe(r => window.location.reload());
  }

}
