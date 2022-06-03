import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DarkModeService } from 'src/services/dark-mode.service';

@Component({
  selector: 'app-mode-switcher',
  templateUrl: './mode-switcher.component.html',
  styleUrls: ['./mode-switcher.component.scss']
})
export class ModeSwitcherComponent implements OnInit {


  constructor(public darkService:DarkModeService) {   
   }

  ngOnInit(): void {
  }


  toggleMode(state: MatSlideToggleChange) {
    if (state.checked) {
      this.darkService.switchTo('dark');
    } else {
      this.darkService.switchTo('light');
    }
  }

}
