import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { now } from 'moment';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { DataService } from 'src/services/data.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  trainings: Training[];
  clients: Client[];
  dogs: Dog[];
  upcomingTrainings: Training[];
  latestTrainings: Training[];
  tableClients: Client[];
  tableDogs: Dog[];
  now = new Date();
  today = new Date(this.now.toDateString()).getTime();//today at midnight

  trainingTableColumns = ['date', 'duration', 'client', 'dog', 'location', 'subject'];
  latestTableColumns = ['date', 'dog', 'client','contact', 'subject', 'topics'];
  clientTableColumns = ['clientNumber', 'firstName', 'lastName', 'missingProps'];
  dogTableColumns = ['name', 'breed', 'owner1', 'missingProps'];

  constructor(public Data: DataService) { }

  async ngOnInit(): Promise<void> {

    this.trainings = await firstValueFrom(this.Data.trainings$);
    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);

    //select upcoming trainings
    this.upcomingTrainings = this.trainings.filter(training => (training.date > this.today) && (training.date < this.today + 7 * 24 * 60 * 60 * 1000));
    this.upcomingTrainings = this.sortJSONArray(this.upcomingTrainings, 'date', 'asc');

    //select latest scheduled training for each dog
    this.latestTrainings = [];
    for (let i = 0; i < this.dogs.length; i++) {
      let dogTrainings = this.trainings.filter(training => this.dogs[i].dogID == training.dogID);
      dogTrainings = this.sortJSONArray(dogTrainings, 'date', 'desc');
      if (dogTrainings.length > 0) {
        if (dogTrainings[0].date < this.today - 28 * 24 * 60 * 60 * 1000)
        this.latestTrainings.push(dogTrainings[0]);
      }
    }

    //select all clients with missing data
    this.tableClients = this.clients.filter(client => this.getMissingClientProps(client).length > 0);
    //select all dogs with missing data
    this.tableDogs = this.dogs.filter(dog => this.getMissingDogProps(dog).length > 0);
  }


  /**
   * get firstname and lastname of clientID
   * @param id - clientId
   * @returns firstname and lastname of clientID
   */
  getClientNameById(id: string): string {
    let client = this.clients.find(client => client.clientID == id);
    return client.firstName + ' ' + client.lastName;
  }


  /**
   * get contact data of clientID
   * @param id - clientId
   * @returns the first that is available of: mobile phone, landline phone or email
   */
  getClientContactById(id: string): string {
    let client = this.clients.find(client => client.clientID == id);
    let contact = '';
    if (client.mobilePhone.number) {
      contact = client.mobilePhone.areaCode + ' / ' + client.mobilePhone.number;
    } else if (client.landlinePhone.number) {
      contact = client.landlinePhone.areaCode + ' / ' + client.landlinePhone.number;
    } else {
      contact = client.email;
    }
    return contact;
  }


  /**
   * get name of dogID
   * @param id - dogId
   * @returns name of dogID
   */
  getDogNameById(id: string): string {
    let dog = this.dogs.find(dog => dog.dogID == id)
    return dog.name;
  }


  /**
   * creates a list of empty properties to indicate which data needs to be recorded
   * @param dog 
   * @returns string
   */
  getMissingClientProps(client: Client): string {
    let missingProps: string = '';
    if (!client.mobilePhone.number && !client.landlinePhone.number) {
      missingProps += (missingProps.length > 0 ? ', ' : '') + 'phone number';
    }
    if (!client.email) {
      missingProps += (missingProps.length > 0 ? ', ' : '') + 'email';
    }
    if (!client.street || !client.city || !client.zipCode) {
      missingProps += (missingProps.length > 0 ? ', ' : '') + 'address';
    }
    return missingProps;
  }


  /**
   * creates a list of empty properties to indicate which data needs to be recorded
   * @param dog 
   * @returns string
   */
  getMissingDogProps(dog: Dog): string {
    let missingProps: string = '';
    if (!dog.birthDate) {
      missingProps += (missingProps.length > 0 ? ', ' : '') + 'date of birth';
    }
    if (!dog.castrated) {
      missingProps += (missingProps.length > 0 ? ', ' : '') + 'castration';
    }
    if (!dog.chipNumber) {
      missingProps += (missingProps.length > 0 ? ', ' : '') + 'chip no.';
    }
    if (!dog.color) {
      missingProps += (missingProps.length > 0 ? ', ' : '') + 'color';
    }
    return missingProps;
  }



  sortJSONArray(array: any[], prop: string, direction: 'desc' | 'asc') {
    return array.sort((a, b) => {
      return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
    });
  }

  /**
  * show detailed data for selected row
  * @param row 
  */
  showRow(row: any) {
    console.log(row);
    // to be completed
  }

}
