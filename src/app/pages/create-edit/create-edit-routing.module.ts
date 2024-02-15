import { Routes } from '@angular/router';
import { FormGameComponent } from './form-game/form-game.component';
import { ScreenPath } from '../../shared/constants/page-path';

export const ROUTE_CREATE_EDIT: Routes = [
    {
        path: ScreenPath.FormGame,
        component: FormGameComponent
    }
];

