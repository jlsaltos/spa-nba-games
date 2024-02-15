import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStoreService } from '../../../services/local-store.service';
import { NbaGamesService } from '../../../services/nba-games.service';
import { ScreenPath } from '../../../shared/constants/page-path';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyLocalStore } from '../../../shared/constants/keys-local-store';
import { Game } from '../../../shared/models/game';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.component.html',
  styleUrl: './form-game.component.scss',
})
export class FormGameComponent implements OnInit, OnDestroy {
  gameForm!: FormGroup;
  isNewGame = false;
  gameEdit!: Game;

  constructor(
    private readonly nbaGamesService: NbaGamesService,
    private localStoreService: LocalStoreService,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.gameEdit = this.localStoreService.getItem(KeyLocalStore.gameEdit);
    this.isNewGame = this.gameEdit ? false : true;
    this.gameForm = this.fb.group({
      season: [
        this.gameEdit?.season ?? '',
        [Validators.required, this.customLengthValidator(4)],
      ],
      status: [this.gameEdit?.status ?? '', [Validators.required]],
    });
  }

  customLengthValidator(maxLength: number) {
    return (control: any) => {
      if (control.value && control.value.toString().length !== maxLength) {
        return { maxLength: true };
      }
      return null;
    };
  }

  onClickCancel() {
    this.router.navigate([`/${ScreenPath.Home}`]);
  }

  onClickSave() {
    const gameToSave = this.gameForm.value;
    if (this.isNewGame) {
      this.nbaGamesService.saveGame(gameToSave);
    } else {
      gameToSave.id = this.gameEdit.id;
      this.nbaGamesService.updateGame(gameToSave);
    }
    this.snackBar.open(`Juego guardado`, 'Éxito!', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.onClickCancel();
  }

  ngOnDestroy() {
    this.localStoreService.removeItem(KeyLocalStore.gameEdit);
  }
}
