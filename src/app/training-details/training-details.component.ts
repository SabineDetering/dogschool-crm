import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent implements OnInit {


  clients: Client[];
  dogs: Dog[];
  // trainings: Training[];
  trainingID: string;
  training: Training;
  constructor(private route: ActivatedRoute, private Data: DataService) { }

  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);

    this.route.params.subscribe(params => {
      this.trainingID = params['trainingID'];
    });

    this.Data.trainings$.subscribe(changes => {
      this.training = changes.filter((t) => (t.trainingID == this.trainingID))
        .map(training => {
          training.clientData = this.getClientDataById(training.clientID);
          training.dogData = new Dog(this.getDogDataById(training.dogID));
          return training;
        })[0];
      console.log('training', this.training)
    });
  }

  getClientDataById(id: string): Client {
    return this.clients.find(client => client.clientID == id);
  }


  getDogDataById(id: string): Dog {
    return this.dogs.find(dog => dog.dogID == id);
  }


  getDetailedAge(ageInYears) {
    let ageString = '';
    if (ageInYears > 1) {
      ageString = `${Math.round(ageInYears * 10) / 10} years`
    } else if (ageInYears > 0.333) {
      ageString = `${Math.round(ageInYears * 12 * 10) / 10} months`
    } else {
      ageString = `${Math.round(ageInYears * 52.14)} weeks`
    }
    console.log(new Date(1643756400000));
    return ageString;
  }
}
