import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbaGamesService } from '../../../services/nba-games.service';
import { ResponseGame } from '../../../shared/models/response-game';
import { Game } from '../../../shared/models/game';
import { LocalStoreService } from '../../../services/local-store.service';
import { KeyLocalStore } from '../../../shared/constants/keys-local-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ScreenPath } from '../../../shared/constants/page-path';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  listGames!: Game[];
  unsubscribe$ = new Subject<void>();

  constructor(
    private readonly nbaGamesService: NbaGamesService,
    private localStoreService: LocalStoreService,
    private snackBar: MatSnackBar,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const listGameLocalStore = this.localStoreService.getItem(
      KeyLocalStore.listGame
    );
    if (listGameLocalStore && listGameLocalStore.length > 0) {
      console.log('localStore: ', listGameLocalStore);
      this.listGames = listGameLocalStore;
      return;
    }
    this.getListGameFromApi();
  }

  getListGameFromApi() {
    this.nbaGamesService
      .getGames()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((responseGames: ResponseGame) => {
        this.listGames = responseGames.data;
        this.localStoreService.setItem(KeyLocalStore.listGame, this.listGames);
      });
  }

  onClickDelete(idGame: number) {
    this.listGames = this.listGames.filter((game) => game.id != idGame);
    this.localStoreService.setItem(KeyLocalStore.listGame, this.listGames);

    this.snackBar.open(`Se ha eliminado el juego ${idGame}`, 'Éxito!', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onClickEdit(gameEdit: Game) {
    this.localStoreService.setItem(KeyLocalStore.gameEdit, gameEdit);
    this.router.navigate([
      `/${ScreenPath.Admin}/${ScreenPath.Game}/${ScreenPath.FormGame}`,
    ]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
