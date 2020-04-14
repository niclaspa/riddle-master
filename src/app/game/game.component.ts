import { Component, OnInit } from '@angular/core';
import { ComputerPlayer } from '../computer-player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  computerPlayers: ComputerPlayer[] = [
    { 
      id: 1, 
      knownRiddles:[1],
      name: 'Johnny' 
    }
  ];

  currentOpponent: ComputerPlayer;

  constructor() {
    this.currentOpponent = this.computerPlayers[0];
  }

  ngOnInit(): void {
  }

}
