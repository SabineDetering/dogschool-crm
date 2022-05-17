import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Dog } from 'src/models/dog.class';
import { ClientDataService } from 'src/services/client-data.service';
import { DogDataService } from 'src/services/dog-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-dog',
  templateUrl: './dialog-add-dog.component.html',
  styleUrls: ['./dialog-add-dog.component.scss']
})
export class DialogAddDogComponent implements OnInit {

  public dog = new Dog();
  public birthDateInput: Date;
  public owner1: string;
  public owner2: string;
  public twoOwners = false;
  public today = new Date();
  public clients: any[];
  public filteredClients_1: any[];
  public filteredClients_2: any[];


  constructor(public addDogDialogRef: MatDialogRef<DialogAddDogComponent>,
    private dogData: DogDataService, public clientData: ClientDataService) { }

  ngOnInit(): void {
    this.clientData.clients$.subscribe(changes => {
      this.clients = changes;
      this.filteredClients_1 = this.clients;
      this.filteredClients_2 = this.clients;
    });
  }

  applyFilter(index,event: Event) {
    let filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this['filteredClients_'+index] = this.clients.filter(client =>
      (client.firstName.toLowerCase().startsWith(filter)) || (client.lastName.toLowerCase().startsWith(filter)));
  }

  addOwner2() {
    this.twoOwners = true;
  }


  saveDog() {
    console.log(this.birthDateInput);
    if (this.birthDateInput) {
      this.dog.birthDate = this.birthDateInput.getTime();
    }
    if (this.owner1) {
      this.dog.owners.push(this.owner1);
    }
    if (this.owner2) {
      this.dog.owners.push(this.owner2);
    }
    this.dogData.saveDog(this.dog.toJSON());
    console.log(this.dog);
  }



}