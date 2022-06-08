import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Training } from 'src/models/training.class';
import { DialogAddEditTrainingComponent } from '../dialog-add-edit-training/dialog-add-edit-training.component';

@Component({
  selector: 'app-small-training-card',
  templateUrl: './small-training-card.component.html',
  styleUrls: ['./small-training-card.component.scss']
})
export class SmallTrainingCardComponent implements OnInit {

  @Input() training: Training;
  @Input() view: string;
  constructor(public dialog: MatDialog,private router:Router) {
  }

  ngOnInit(): void {
  }


  /**
   * open dialog to edit all training details, incl. key data
   */
  editTraining() {
    this.router.navigate(['/training/'+  this.training.trainingID ]);
    // const dialogRef = this.dialog.open(DialogAddEditTrainingComponent, {
    //   height: '90vh',
    //   width: '600px',
    //   data: { training: this.training }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { this.training = result.data }
    // });
  }

}
