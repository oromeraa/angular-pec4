import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CardComponent } from '../../components/card/card.component';
import { GridComponent } from '../../components/grid/grid.component';

import { Paper } from '../../models/paper.interface';
import { OpenalexService } from '../../services/openalex.service';

@Component({
  selector: 'app-papers-list',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    CardComponent,
    GridComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './papers-list.component.html',
  styleUrl: './papers-list.component.scss',
})
export class PapersListComponent {
  viewMode = signal<'cards' | 'grid'>('cards');
  papers = signal<Paper[]>([]);
  loading = signal(true);

  constructor(private openalexService: OpenalexService) {}

  ngOnInit(): void {
    this.openalexService.getPapers().subscribe((response) => {
      this.papers.set(response);
      this.loading.set(false);
    });
  }
}
