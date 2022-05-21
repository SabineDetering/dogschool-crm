import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { ClientDataService } from 'src/services/client-data.service';
import { DogDataService } from 'src/services/dog-data.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  clients: Client[];
  dogs: Dog[];
  tableClients: Client[];
  tableDogs: Dog[];

  clientTableColumns = ['clientNumber', 'firstName', 'lastName', 'missingProps'];
  dogTableColumns = ['name', 'breed', 'owner1', 'missingProps'];

  constructor(public dogData: DogDataService,
    public clientData: ClientDataService) { }

  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.clientData.clients$);
    this.dogs = await firstValueFrom(this.dogData.dogs$);

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
    let client = this.clients.find(client => client.clientID == id)
    return client.firstName + ' ' + client.lastName;
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


  /**
  * show detailed data for selected row
  * @param row 
  */
  showRow(row: any) {
    console.log(row);
    // to be completed
  }

}
