import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Paper } from '../../models/paper.interface';

@Component({
  selector: 'app-grid',
  imports: [MatTableModule, RouterLink],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() papers: Paper[] = [];
  showedColumns = ['title', 'author', 'year'];
}
