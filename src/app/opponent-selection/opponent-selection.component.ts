import { Component, OnInit, Input } from '@angular/core';
import { ComputerPlayer } from '../computer-player';
import { GameState } from '../game-state';
import { Statement } from '@angular/compiler';

@Component({
  selector: 'app-opponent-selection',
  templateUrl: './opponent-selection.component.html',
  styleUrls: ['./opponent-selection.component.css']
})
export class OpponentSelectionComponent implements OnInit {

  @Input() state: GameState;
  
  computerPlayers: ComputerPlayer[] = [
    { 
      id: 1, 
      knownRiddles:[1,3,5,8,7,9],
      name: 'Johnny' 
    },
    { 
      id: 2, 
      knownRiddles:[1,2,6,9,10],
      name: 'Tony' 
    },
    { 
      id: 3, 
      knownRiddles:[2,4,5,6,8,10],
      name: 'Tim' 
    },
    { 
      id: 4, 
      knownRiddles:[2,3,4,5,7,6],
      name: 'Jim' 
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.state.currentOpponent = this.computerPlayers[0];
  }

  onOpponentSelected(e) {
    var selectedName = e.target.innerHTML.trim();
    this.state.currentOpponent = this.computerPlayers.find(p => p.name == selectedName);

    // start the duel
    this.state.isDuelRunning = true;
  }
}
