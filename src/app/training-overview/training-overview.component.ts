import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom, map } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { DataService } from 'src/services/data.service';
import { FilterStringService } from 'src/services/filter-string.service';
import { DialogAddEditTrainingComponent } from '../dialog-add-edit-training/dialog-add-edit-training.component';

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.component.html',
  styleUrls: ['./training-overview.component.scss']
})
export class TrainingOverviewComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;

  clients: Client[];
  dogs: Dog[];
  trainings: Training[];

  sortProp = 'date';
  sortDir: string = 'desc';
  searchString: string;

  tableColumns = ['date', 'duration', 'clientName', 'dogName', 'location', 'subject', 'topics'];

  constructor(
    public dialog: MatDialog,
    public Data: DataService,
    public filter: FilterStringService
  ) { }


  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);
 
    this.Data.trainings$.subscribe(changes => {
      this.trainings = changes.map(t => {
        let training = new Training(t);
        training.clientName = this.getClientNameById(training.clientID);
        training.dogName = this.getDogNameById(training.dogID);
        return training;
      });
    });

    this.filter.filterSource.subscribe(val => {
      this.searchString = val;
    });
  };


  setSorting(sorting: Sort) {
    this.sortProp = sorting.active;
    this.sortDir = sorting.direction;
    this.table.renderRows();
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
   * get name of dogID
   * @param id - dogId
   * @returns name of dogID
   */
  getDogNameById(id: string): string {
    let dog = this.dogs.find(dog => dog.dogID == id)
    return dog.name;
  }


  openAddEditTrainingDialog(): void {
    this.dialog.open(DialogAddEditTrainingComponent);
  }

}
