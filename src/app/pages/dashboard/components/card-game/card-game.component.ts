import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../../../shared/models/game';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.scss'
})
export class CardGameComponent {

  @Input() game!: Game;
  @Output() clickEventDelete: EventEmitter<number> = new EventEmitter();
  @Output() clickEventEdit: EventEmitter<Game> = new EventEmitter();

  onClickDeleteGame(idGame: number) {
    this.clickEventDelete.emit(idGame)
  }

  onClickEditGame(game: Game) {
    this.clickEventEdit.emit(game)
  }

}
