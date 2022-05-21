import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { DataService } from 'src/services/data.service';
import { DialogAddTrainingComponent } from '../dialog-add-training/dialog-add-training.component';

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
  tableTrainings: Training[];

  tableColumns = [ 'date','duration', 'client', 'dog','location', 'subject', 'topics'  ];

  constructor(public dialog: MatDialog, public Data: DataService) { }


  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);
    // this.trainings = await firstValueFrom(this.Data.trainings$);

    this.Data.trainings$.subscribe(changes => {
      this.trainings = changes.map(t => new Training(t));
     
      //by default trainings are displayed with descending date -> newest training on top
      if (this.trainings.length > 0) {
        // not possible to use generateTableData because renderRows is not accepted onInit
        this.tableTrainings = this.sortTrainings({ active: 'date', direction: 'desc' });
      }
    });
  };



  generateTableData(sorting: Sort, filter: string) {
    //filter to be added
    if (sorting) {
      this.tableTrainings = this.sortTrainings(sorting);
      this.table.renderRows();
    } else {
      this.tableTrainings = this.trainings;
    }
  }


  sortTrainings(sortState: Sort) {
    let prop = sortState.active;
    let direction = sortState.direction;
    return this.trainings.sort((a, b) => {
      return (a[prop] < b[prop] ? -1 : 1) * (direction == 'desc' ? -1 : 1)
    });
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


  openAddTrainingDialog(): void {
    const addTrainingDialog = this.dialog.open(DialogAddTrainingComponent);
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


