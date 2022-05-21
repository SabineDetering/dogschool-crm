import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/models/client.class';
import { Dog } from 'src/models/dog.class';
import { Training } from 'src/models/training.class';
import { ClientDataService } from 'src/services/client-data.service';
import { DataService } from 'src/services/data.service';
import { DogDataService } from 'src/services/dog-data.service';
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

  tableColumns = ['date', 'time', 'client', 'dog', 'subject', 'main topics'];

  constructor(public dialog: MatDialog, public Data: DataService) { }


  async ngOnInit(): Promise<void> {

    this.clients = await firstValueFrom(this.Data.clients$);
    this.dogs = await firstValueFrom(this.Data.dogs$);
    this.trainings = await firstValueFrom(this.Data.trainings$);

    this.Data.clients$.subscribe(changes => {
      this.clients = changes.map(c => new Client(c));

      this.clients.forEach(client => {
        for (let i = 0; i < this.dogs.length; i++) {
          let dog = this.dogs[i];
          if (dog.ownerIds.includes(client.clientID)) {
            client.ownedDogs += (client.ownedDogs.length > 0 ? ', ' : '') + dog.name;
          }
        }
      });
      console.log('clients', this.clients);
      //by default clients are displayed with descending client numbers -> newest client on top
      if (this.clients.length > 0) {
        // not possible to use generateTableData because renderRows is not accepted onInit
        this.tableTrainings = this.sortTrainings({ active: 'clientNumber', direction: 'desc' });
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


  openAddClientDialog(): void {
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


