import { Component, OnInit, Input } from '@angular/core';
import { RiddleService } from '../riddle.service';
import { Riddle } from '../riddle';
import { ComputerPlayer } from '../computer-player';
import { Player } from '../player';
import { delay } from 'q';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {

  @Input() opponent: ComputerPlayer;
  @Input() player: Player;

  riddles: Riddle[];
  currentRiddle: Riddle;
  playerMessage: string;
  opponentMessage: string;
  options: string[];

  constructor(public riddleService: RiddleService) { }

  ngOnInit(): void {
    this.riddles = this.riddleService.getRiddles();
    this.opponentSay('Here\'s ' + this.opponent.name);
    this.showQuestions();
  }

  async onClick(e) {
    this.currentRiddle = this.riddles.find(r => r.question == e.target.innerHTML.trim()) ;
    this.playerTurn();
    await delay(2000);
    this.opponentTurn();
  }

  playerTurn(): void {
    this.playerMessage = this.currentRiddle.question;
    this.showQuestions();
    
    if (this.opponentKnowsAnswer(this.currentRiddle.id)) {
      this.opponentSay(this.currentRiddle.answer);
    } else {
      this.opponentSay('No eyed deer!')
    }
    
  }

  opponentTurn(): void {
    var riddleIdToAsk = this.getRandomOpponentRiddleId();
    var riddleToAsk = this.lookupRiddle(riddleIdToAsk);       
    this.opponentSay(riddleToAsk.question);
    this.showAnswers();
    
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  showQuestions(): void {
    this.options = this.riddles.map(function(r) { return r.question });
  }

  showAnswers(): void {
    var that = this;
    this.options = this.player.knownRiddles.map(function(r) { return that.lookupRiddle(r).answer });
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
