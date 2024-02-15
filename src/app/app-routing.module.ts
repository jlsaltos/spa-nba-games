import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { ScreenPath } from './shared/constants/page-path';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ScreenPath.Home },
  { path: ScreenPath.Home, component: HomeComponent },
  {
    path: ScreenPath.Admin,
    children: [
        {
            path: ScreenPath.Game,
            loadChildren:
                () => import('../app/pages/create-edit/create-edit.module').then(m => m.CreateEditModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
