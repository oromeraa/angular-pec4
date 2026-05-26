import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { OpenalexService } from '../../services/openalex.service';
import { Paper } from '../../models/paper.interface';

@Component({
  selector: 'app-paper-detail',
  imports: [RouterLink, MatButtonModule, MatExpansionModule],
  templateUrl: './paper-detail.component.html',
  styleUrl: './paper-detail.component.scss',
})
export class PaperDetailComponent implements OnInit {
  paper = signal<Paper | null>(null);

  constructor(
    private openalexService: OpenalexService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.openalexService.getPaperById(id).subscribe((paper) => {
        this.paper.set(paper);
      });
    }
  }
}
