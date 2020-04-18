import { Component, OnInit } from '@angular/core';
import { ComputerPlayer } from '../computer-player';
import { Player } from '../player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  computerPlayers: ComputerPlayer[] = [
    { 
      id: 1, 
      knownRiddles:[1,3,5],
      name: 'Johnny' 
    }
  ];

  player: Player = {
    knownAnswers:[1,2,4],
    knownQuestions:[2,4,1],
    name: 'Peter'  
  };

  currentOpponent: ComputerPlayer;

  constructor() {
    this.currentOpponent = this.computerPlayers[0];
  }

  ngOnInit(): void {
  }

}
