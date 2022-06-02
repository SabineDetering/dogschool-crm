import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-mode-switcher',
  templateUrl: './mode-switcher.component.html',
  styleUrls: ['./mode-switcher.component.scss']
})
export class ModeSwitcherComponent implements OnInit {

  darkMode = false;//light mode active by default
  static counter = 0;
  id_number: number;

  constructor() {
    ModeSwitcherComponent.counter++;
    this.id_number = ModeSwitcherComponent.counter;
   }

  ngOnInit(): void {
  }


  toggleMode(state: MatSlideToggleChange) {
    
    if (state.checked) {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.darkMode = false;
      document.body.classList.remove('dark-mode');
    }
  }

}
