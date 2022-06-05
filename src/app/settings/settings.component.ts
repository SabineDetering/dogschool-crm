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

  constructor(public Data: DataService) { }
  

  async ngOnInit(): Promise<void> {
    this.subjects = (await firstValueFrom(this.Data.subjects$)).subjectList;
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.subjects, event.previousIndex, event.currentIndex);
    console.log(this.subjects);
  }

  saveSubjects() {
    this.Data.saveSubjects(this.subjects);
  }
}
