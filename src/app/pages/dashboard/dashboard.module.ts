import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CardGameComponent } from './components/card-game/card-game.component';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [MaterialModule,CommonModule ],
    exports: [HomeComponent],
    declarations: [HomeComponent, CardGameComponent],
    providers: [],
})
export class DashboardModule { }
