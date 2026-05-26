import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OpenalexService } from '../../services/openalex.service';

import { OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Paper } from '../../models/paper.interface';

@Component({
  selector: 'app-papers-list',
  imports: [RouterLink, MatListModule],
  templateUrl: './papers-list.component.html',
  styleUrl: './papers-list.component.scss',
})
export class PapersListComponent implements OnInit {
  papers = new Array<Paper>();

  constructor(private openalexService: OpenalexService) {}

  ngOnInit(): void {
    this.openalexService.getPapers().subscribe((response) => {
      this.papers = response;
      console.log(response);
    });
  }
}
