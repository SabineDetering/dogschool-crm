import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterStringService {

  public filterSource = new BehaviorSubject('');

  constructor() { }

}
