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
  currentAskedRiddle: Riddle;
  currentAnsweredRiddle: Riddle;
  playerMessage: string;
  opponentMessage: string;
  options: string[];
  isPlayerTurnToAskQuestion: boolean;

  constructor(public riddleService: RiddleService) { }

  ngOnInit(): void {
    this.riddles = this.riddleService.getRiddles();
    this.opponentSay('Here\'s ' + this.opponent.name);

    this.isPlayerTurnToAskQuestion = true;
    this.showQuestions();
  }

  async onClick(e) {
    var selectedOption = e.target.innerHTML.trim();
    
    if (this.isPlayerTurnToAskQuestion){
      // the player has just clicked on a question
      this.currentAskedRiddle = this.riddles.find(r => r.question == selectedOption);
      this.playerAskQuestion();
      this.opponentAnswer();
      await delay(2000);
      this.opponentAskQuestion();
      this.showAnswers();
      this.isPlayerTurnToAskQuestion = false;
    } else {
      // the player has just clicked on an answer
      this.currentAnsweredRiddle = this.riddles.find(r => r.answer == selectedOption);
      this.playerSay(this.currentAnsweredRiddle.answer);
      if (this.currentAskedRiddle.id == this.currentAnsweredRiddle.id){
        this.opponentSay('Correct!');
      } else {
        this.opponentSay('Wrong!');
      }
      await delay(2000);
      this.showQuestions();
      this.isPlayerTurnToAskQuestion = true;
    }
  }

  playerAskQuestion(): void {
    this.playerMessage = this.currentAskedRiddle.question;
  }

  opponentAnswer(): void {
    if (this.opponentKnowsAnswer(this.currentAskedRiddle.id)) {
      this.opponentSay(this.currentAskedRiddle.answer);
    } else {
      this.opponentSay('No eyed deer!')
    }
  }

  opponentAskQuestion(): void {
    var riddleIdToAsk = this.getRandomOpponentRiddleId();
    var riddleToAsk = this.lookupRiddle(riddleIdToAsk);       
    this.opponentSay(riddleToAsk.question);
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

  playerSay(text): void {
    this.playerMessage = text;
  }

  lookupRiddle(id): Riddle {
    return this.riddles.find(r => r.id == id);
  }

  getRandomOpponentRiddleId(): number {
    var r = Math.floor((Math.random() * 3));
    return this.opponent.knownRiddles[r];
  }
}
