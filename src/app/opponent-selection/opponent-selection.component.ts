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
      knownRiddles:[1,3,5],
      name: 'Johnny' 
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
