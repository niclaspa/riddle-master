import { Component, OnInit } from '@angular/core';
import { ComputerPlayer } from '../computer-player';
import { Player } from '../player';
import { GameState } from '../game-state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  player: Player = {
    knownAnswers:[],
    knownQuestions:[1],
    name: 'Peter'  
  };

  state: GameState;

  constructor() {
    this.state = { 
      isDuelRunning: false, 
      currentOpponent: null
    };
  }

  ngOnInit(): void {
  }
}
