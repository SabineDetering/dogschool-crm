import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { filter, firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { DataService } from 'src/services/data.service';
import { DialogDeleteConfirmationComponent } from '../dialog-delete-confirmation/dialog-delete-confirmation.component';
import { DialogAddEditTrainingComponent } from '../dialog-add-edit-training/dialog-add-edit-training.component';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent implements OnInit {


  clients: Client[];
  dogs: Dog[];
  trainingID: string;
  training: Training;
  constructor(
    private route: ActivatedRoute,
    private Data: DataService,
    public dialog: MatDialog,
    private location: Location) { }
  

  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);

    this.route.params.subscribe(params => {
      this.trainingID = params['trainingID'];
    });

    //get the selected training and add the corresponding client and dog data
    this.Data.trainings$.subscribe(changes => {
      this.training = changes
        .filter((t) => (t.trainingID == this.trainingID))
        .map(training => {
          training = new Training(training);
          training.clientData = this.getClientDataById(training.clientID);
          training.dogData = new Dog(this.getDogDataById(training.dogID));
          return training;
        })[0];
      console.log('training', this.training)
    });
  }


  /**
   * returns all data saved for the given clientID
   * @param id - clientID
   * @returns client data for the given clientID
   */
  getClientDataById(id: string): Client {
    return this.clients.find(client => client.clientID == id);
  }


  /**
   * returns all data saved for the given dogID
   * @param id - dogID
   * @returns dog data for the given dogtID
   */
  getDogDataById(id: string): Dog {
    return this.dogs.find(dog => dog.dogID == id);
  }


  /**
   * transforms ages below 1 years into months and ages below 4 months into weeks
   * @param ageInYears 
   * @returns age information as string
   */
  getDetailedAge(ageInYears: number): string {
    let ageString = '';
    if (ageInYears > 1) {
      ageString = `${Math.round(ageInYears * 10) / 10} years`
    } else if (ageInYears > 0.333) {
      ageString = `${Math.round(ageInYears * 12 * 10) / 10} months`
    } else {
      ageString = `${Math.round(ageInYears * 52.14)} weeks`
    }
    return ageString;
  }


  /**
   * update training details on firestore and go back to previous page
   */
  saveTraining() {
    this.Data.saveTraining(this.training.toJSON(), this.training.trainingID);
    this.closeTraining();
  }


  /**
   * open dialog to get confirmation for deletion or cancel deletion
   */
  openDeleteConfirmationDialog() {
    const confirmationRef = this.dialog.open(DialogDeleteConfirmationComponent);
    confirmationRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.deleteTraining();
      }
    });
  }


  /**
   * delete training details on firestore and go back to previous page
   */
  deleteTraining() {
    this.Data.deleteTraining(this.training.trainingID);
    this.closeTraining();
  }


  /**
   * close details view and go back to previous page
   */
  closeTraining() {
    this.location.back();
  }


  /**
   * open dialog to edit all training details, incl. key data
   */
  editTraining() {
    this.dialog.open(DialogAddEditTrainingComponent, {
      height: '90vh',
      width: '600px',
      data: { training: this.training }  });
  }

}
