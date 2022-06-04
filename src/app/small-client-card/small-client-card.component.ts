import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';

@Component({
  selector: 'app-small-client-card',
  templateUrl: './small-client-card.component.html',
  styleUrls: ['./small-client-card.component.scss']
})
export class SmallClientCardComponent implements OnInit {

  @Input() client: Client;
  constructor() { }

  ngOnInit(): void {
  }

}
