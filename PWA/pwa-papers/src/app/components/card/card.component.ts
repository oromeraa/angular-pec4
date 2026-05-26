import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Paper } from '../../models/paper.interface';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() paper!: Paper;
}
