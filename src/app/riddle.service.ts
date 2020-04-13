import { Injectable } from '@angular/core';
import { RIDDLES } from './riddles';
import { Riddle } from './riddle';

@Injectable({
  providedIn: 'root'
})
export class RiddleService {

  constructor() { }

  getRiddles(): Riddle[] {
    return RIDDLES;
  }
}
