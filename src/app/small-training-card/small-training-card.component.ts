import { Component, Input, OnInit } from '@angular/core';
import { Training } from 'src/models/training.class';

@Component({
  selector: 'app-small-training-card',
  templateUrl: './small-training-card.component.html',
  styleUrls: ['./small-training-card.component.scss']
})
export class SmallTrainingCardComponent implements OnInit {

  @Input() training: Training;
  constructor() { }

  ngOnInit(): void {
  }

}
