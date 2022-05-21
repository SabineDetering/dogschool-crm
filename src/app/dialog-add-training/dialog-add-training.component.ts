import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';
import { Training } from 'src/models/training.class';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dialog-add-training',
  templateUrl: './dialog-add-training.component.html',
  styleUrls: ['./dialog-add-training.component.scss']
})
export class DialogAddTrainingComponent implements OnInit {

  public training = new Training();
  public clients: Client[];
  public filteredClients: Client[];
  public dogs: Dog[];
  public filteredDogs: Dog[];
  public subjects: string[];
  public durationArray = [30, 45, 60, 90, 120];

  // public DateInput: Date;
  // public minHours: number;
  // public maxHours: number;
  // public minuteArray = ['00', '15', '30', '45'];


  constructor(
    public addTrainingDialogRef: MatDialogRef<DialogAddTrainingComponent>,
    private Data: DataService,) { }

  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);
    // this.subjects = await firstValueFrom(this.Data.subjects$);

    this.Data.subjects$.subscribe(changes => {
      this.subjects = changes.subjectList;
    });


    this.filteredClients = this.clients;
    this.filteredDogs = this.dogs;
  }


  applyClientFilter(event: Event) {
    let filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      (client.firstName.toLowerCase().startsWith(filter)) || (client.lastName.toLowerCase().startsWith(filter)));
  }

  applyDogFilter() {
    this.filteredDogs = this.dogs.filter(dog => dog.ownerIds.includes(this.training.clientID));     
  }


  saveTraining() {
    console.log(this.training);
    this.Data.saveTraining(this.training.toJSON());
  }

}
