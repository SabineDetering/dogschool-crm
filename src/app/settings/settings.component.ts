import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  subjects: string[];
  newSubject: string='';

  constructor(public Data: DataService) { }
  

  async ngOnInit(): Promise<void> {
    this.subjects = (await firstValueFrom(this.Data.subjects$)).subjectList;
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
  

  deleteSubject(i:number) {
    this.subjects.splice(i, 1);
  }


  saveSubjects() {
    console.log('saved subjects', this.subjects);
    this.Data.saveSubjects(this.subjects);
  }

  discardChanges() {
    window.location.reload();
  }
}
