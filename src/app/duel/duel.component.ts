import { Component, OnInit, Input } from '@angular/core';
import { RiddleService } from '../riddle.service';
import { Riddle } from '../riddle';
import { ComputerPlayer } from '../computer-player';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {

  @Input() opponent: ComputerPlayer;

  riddles: Riddle[];
  currentRiddle: Riddle;
  playerMessage: string;
  opponentMessage: string;

  constructor(public riddleService: RiddleService) { }

  ngOnInit(): void {
    this.riddles = this.riddleService.getRiddles();
    this.opponentMessage = 'Here\'s ' + this.opponent.name;
  }

  onClick(e) {
    this.currentRiddle = this.riddles.find(r => r.question == e.target.innerHTML.trim()) ;
    this.playerMessage = this.currentRiddle.question;
  }
}
