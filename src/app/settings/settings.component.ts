import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  subjects: string[];
  newSubject: string = '';

  constructor(
    public Data: DataService,
    private _snackBar: MatSnackBar
  ) { }


  async ngOnInit(): Promise<void> {
    this.subjects = (await firstValueFrom(this.Data.subjects$)).subjectList;
  }


  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }


  /**
   * moves the dragged item into the new position in the array
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.subjects, event.previousIndex, event.currentIndex);
  }


  addSubject() {
    this.subjects.unshift(this.newSubject.trim());
    this.newSubject = '';
  }


  deleteSubject(i: number) {
    this.subjects.splice(i, 1);
  }


  saveSubjects() {
    console.log('saved subjects', this.subjects);
    this.Data.saveSubjects(this.subjects);
    this.openSnackBar('Changes have been saved.');
  }

  
  discardChanges() {
    window.location.reload();
    this.openSnackBar('Changes have been discarded.');
  }
}
