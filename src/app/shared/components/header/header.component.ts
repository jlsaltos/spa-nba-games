import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenPath } from '../../constants/page-path';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(protected router: Router) {}

  goNewGame() {
    this.router.navigate([
      `/${ScreenPath.Admin}/${ScreenPath.Game}/${ScreenPath.FormGame}`,
    ]);
  }
}
