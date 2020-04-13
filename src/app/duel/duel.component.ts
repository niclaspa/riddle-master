import { Component, OnInit } from '@angular/core';
import { RiddleService } from '../riddle.service';
import { Riddle } from '../riddle';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {

  riddles: Riddle[];
  currentRiddle: Riddle;

  constructor(public riddleService: RiddleService) { }

  ngOnInit(): void {
    this.riddles = this.riddleService.getRiddles();
  }

  onClick(e) {
    this.currentRiddle = this.riddles.find(r => r.question == e.target.innerHTML.trim()) ;
  }
}
