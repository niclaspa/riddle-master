import { Component, OnInit, Input } from '@angular/core';
import { RiddleService } from '../riddle.service';
import { Riddle } from '../riddle';
import { ComputerPlayer } from '../computer-player';
import { Player } from '../player';
import { delay } from 'q';
import { GameState } from '../game-state';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {

  @Input() state: GameState;
  @Input() player: Player;

  riddles: Riddle[];
  currentAskedRiddle: Riddle;
  currentAnsweredRiddle: Riddle;
  playerMessage: string;
  opponentMessage: string;
  options: string[];
  isPlayerTurnToAskQuestion: boolean;
  playerScore: number;
  opponentScore: number;

  constructor(public riddleService: RiddleService) { }

  ngOnInit(): void {
    this.riddles = this.riddleService.getRiddles();
    this.opponentSay('Here\'s ' + this.state.currentOpponent.name);
    this.playerScore = 3;
    this.opponentScore = 3;

    this.isPlayerTurnToAskQuestion = true;
    this.showQuestions();
  }

  async onClick(e) {
    var selectedOption = e.target.innerHTML.trim();
    
    if (this.isPlayerTurnToAskQuestion){
      // the player has just clicked on a question
      this.currentAskedRiddle = this.riddles.find(r => r.question == selectedOption);
      this.playerAskQuestion();
      this.opponentSay('Thinking...');
      await delay(2000);
      this.opponentAnswer();
      await delay(2000);
      this.opponentAskQuestion();
      this.playerSay('');
      this.showAnswers();
      this.isPlayerTurnToAskQuestion = false;
    } else {
      // the player has just clicked on an answer
      this.currentAnsweredRiddle = this.riddles.find(r => r.answer == selectedOption);
      this.playerSay(selectedOption);
      if (this.currentAnsweredRiddle && this.currentAskedRiddle.id == this.currentAnsweredRiddle.id){
        this.opponentSay('Correct!');
        this.opponentScore = this.opponentScore-1;
      } else {
        this.opponentSay('Wrong!');
        this.playerScore = this.playerScore-1;
      }
      await delay(2000);
      this.opponentSay('');
      this.showQuestions();
      this.isPlayerTurnToAskQuestion = true;
    }
    this.checkDuelEnd();
  }

  playerAskQuestion(): void {
    this.playerMessage = this.currentAskedRiddle.question;
  }

  opponentAnswer(): void {
    if (this.opponentKnowsAnswer(this.currentAskedRiddle.id)) {
      this.opponentSay(this.currentAskedRiddle.answer);
      this.playerScore = this.playerScore-1;

      // learn the answer if we don't know it already
      if (!this.player.knownAnswers.includes(this.currentAskedRiddle.id)){
        this.player.knownAnswers.push(this.currentAskedRiddle.id);
      }
    } else {
      this.opponentSay('No eyed deer!');
      this.opponentScore = this.opponentScore-1;
    } 
  }

  checkDuelEnd(): void {
    if (this.playerScore == 0 || this.opponentScore == 0) {
      this.state.isDuelRunning = false;  
    }
  }

  opponentAskQuestion(): void {
    var riddleIdToAsk = this.getRandomOpponentRiddleId();
    var riddleToAsk = this.lookupRiddle(riddleIdToAsk);       
    this.opponentSay(riddleToAsk.question);
    this.currentAskedRiddle = riddleToAsk;

    // learn the question if we don't know it already
    if (!this.player.knownQuestions.includes(riddleIdToAsk)) {
      this.player.knownQuestions.push(riddleIdToAsk);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  showQuestions(): void {
    var that = this;
    this.options = this.player.knownQuestions.map(function(r) { return that.lookupRiddle(r).question });
  }

  showAnswers(): void {
    var that = this;
    this.options = this.player.knownAnswers.map(function(r) { return that.lookupRiddle(r).answer });
    this.options.push('No eyed deer!');
    this.options.push('I haven\'t got a clue!');
  }

  opponentKnowsAnswer(riddleId): boolean {
    return this.state.currentOpponent.knownRiddles.includes(riddleId);
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
    return this.state.currentOpponent.knownRiddles[r];
  }
}
