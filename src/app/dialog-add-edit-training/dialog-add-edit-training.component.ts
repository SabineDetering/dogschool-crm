import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';
import { Training } from 'src/models/training.class';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dialog-add-edit-training',
  templateUrl: './dialog-add-edit-training.component.html',
  styleUrls: ['./dialog-add-edit-training.component.scss']
})
export class DialogAddEditTrainingComponent implements OnInit {

  public training: Training;
  public clients: Client[];
  public filteredClients: Client[];
  public dogs: Dog[];
  public filteredDogs: Dog[];
  public subjects: string[];
  public durationArray = [30, 45, 60, 90, 120];
  public dateInput: string;


  constructor(
    public addTrainingDialogRef: MatDialogRef<DialogAddEditTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private Data: DataService) { }

  async ngOnInit(): Promise<void> {

    if (this.dialogData) {
      if (this.dialogData.training) {
        this.training = new Training(this.dialogData.training);
        this.dateInput = new Date(this.training.date - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 19);
      } else {
        this.training = new Training();
        if (this.dialogData.clientID) {
          this.training.clientID = this.dialogData.clientID;
        }
        if (this.dialogData.dogID) {
          this.training.dogID = this.dialogData.dogID;
        }
      }
    } else {
      this.training = new Training();
    }

    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);
    // this.subjects = await firstValueFrom(this.Data.subjects$);

    this.Data.subjects$.subscribe(changes => {
      this.subjects = changes.subjectList;
    });

    this.filteredClients = this.clients;
    this.filteredDogs = this.dogs;
    this.filterDogsOfSelectedClient();
  }


  applyClientFilter(event: Event) {
    let filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      (client.firstName.toLowerCase().startsWith(filter)) || (client.lastName.toLowerCase().startsWith(filter)));
  }


  filterDogsOfSelectedClient() {
    this.filteredDogs = this.dogs.filter(dog => dog.ownerIds.includes(this.training.clientID));
  }


  saveTraining() {
    this.training.date = new Date(this.dateInput).getTime();
    console.log(this.training);
    this.Data.saveTraining(this.training.toJSON(), this.training.trainingID);
  }

}
