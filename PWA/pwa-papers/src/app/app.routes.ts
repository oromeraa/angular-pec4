import { Routes } from '@angular/router';
import { PaperDetailComponent } from './pages/paper-detail/paper-detail.component';
import { PapersListComponent } from './pages/papers-list/papers-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'papers', pathMatch: 'full' },
  { path: 'papers', component: PapersListComponent },
  { path: 'paper/:id', component: PaperDetailComponent },
];
