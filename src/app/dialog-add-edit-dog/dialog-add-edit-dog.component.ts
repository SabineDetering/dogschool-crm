import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dog } from 'src/models/dog.class';
import { Client } from 'src/models/client.class';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dialog-add-edit-dog',
  templateUrl: './dialog-add-edit-dog.component.html',
  styleUrls: ['./dialog-add-edit-dog.component.scss']
})

export class DialogAddEditDogComponent implements OnInit {

  dog: Dog;
  birthDateInput: string;
  owner1: string;
  owner2: string;
  twoOwners = false;
  today = new Date().toISOString().slice(0, 10);
  clients: Client[];
  filteredClients_1: Client[];
  filteredClients_2: Client[];


  constructor(
    public addDogDialogRef: MatDialogRef<DialogAddEditDogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Client,
    private Data: DataService
  ) { }

  ngOnInit(): void {

    this.Data.clients$.subscribe(changes => {
      this.clients = changes.map(c => new Client(c));
      this.filteredClients_1 = this.clients;
      this.filteredClients_2 = this.clients;
    });

    if (this.dialogData) {
      this.dog = new Dog(this.dialogData);
      if (this.dog.birthDate) {
        this.birthDateInput = new Date(this.dog.birthDate - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      }
      for (let i = 1; i < this.dog.ownerIds.length + 1; i++) {
        this['owner' + i] = this.dog.ownerIds[i - 1];
      }
      if (this.owner2) {
        this.twoOwners = true;
      }
    } else {
      this.dog = new Dog();
    }
  };


  applyFilter(index:number, event: Event) {
    let filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this['filteredClients_' + index] = this.clients.filter(client =>
      (client.firstName.toLowerCase().startsWith(filter)) || (client.lastName.toLowerCase().startsWith(filter)));
  }


  addOwner2() {
    this.twoOwners = true;
  }


  saveDog() {
    if (this.birthDateInput) {
      this.dog.birthDate = new Date(this.birthDateInput).getTime();
    }
    this.dog.ownerIds[0]=this.owner1;
    if (this.owner2) {
      this.dog.ownerIds[1] = this.owner2;
    }
    this.Data.saveDog(this.dog.toJSON(), this.dog.dogID);
    console.log('saved dog',this.dog);
  }

}