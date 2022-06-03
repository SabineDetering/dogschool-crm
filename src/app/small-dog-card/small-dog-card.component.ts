import { Component, Input, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.class';

@Component({
  selector: 'app-small-dog-card',
  templateUrl: './small-dog-card.component.html',
  styleUrls: ['./small-dog-card.component.scss']
})
export class SmallDogCardComponent implements OnInit {

  @Input() dog:Dog;
  constructor() { }

  ngOnInit(): void {
  }


  /**
   * transforms ages below 1 years into months and ages below 4 months into weeks
   * @param ageInYears 
   * @returns age information as string
   */
  getDetailedAge(ageInYears: number): string {
    let ageString = '';
    if (ageInYears > 1) {
      ageString = `${Math.round(ageInYears * 10) / 10} years`
    } else if (ageInYears > 0.333) {
      ageString = `${Math.round(ageInYears * 12 * 10) / 10} months`
    } else {
      ageString = `${Math.round(ageInYears * 52.14)} weeks`
    }
    return ageString;
  }



}
