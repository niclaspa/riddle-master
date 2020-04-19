import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { GameComponent } from './game/game.component';
import { DuelComponent } from './duel/duel.component';
import { OpponentSelectionComponent } from './opponent-selection/opponent-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    GameComponent,
    DuelComponent,
    OpponentSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
