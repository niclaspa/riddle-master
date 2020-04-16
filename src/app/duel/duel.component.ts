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
    this.opponentSay('Here\'s ' + this.opponent.name);
  }

  onClick(e) {
    this.currentRiddle = this.riddles.find(r => r.question == e.target.innerHTML.trim()) ;
    this.playerMessage = this.currentRiddle.question;
    
    if (this.opponentKnowsAnswer(this.currentRiddle.id)) {
      this.opponentSay(this.currentRiddle.answer);
    } else {
      this.opponentSay('No eyed deer!')
    }

    var riddleIdToAsk = this.getRandomOpponentRiddleId();
    var riddleToAsk = this.lookupRiddle(riddleIdToAsk);       
    this.opponentSay(riddleToAsk.question);
  }

  opponentKnowsAnswer(riddleId): boolean {
    return this.opponent.knownRiddles.includes(riddleId);
  }

  opponentSay(text): void {
    this.opponentMessage = text;
  }

  lookupRiddle(id): Riddle {
    return this.riddles.find(r => r.id == id);
  }

  getRandomOpponentRiddleId(): number {
    var r = Math.floor((Math.random() * 3));
    return this.opponent.knownRiddles[r];
  }
}
