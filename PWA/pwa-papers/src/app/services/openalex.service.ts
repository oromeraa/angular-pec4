import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Paper } from '../models/paper.interface';

@Injectable({
  providedIn: 'root',
})
export class OpenalexService {
  private apiOpenAlexUrl = 'https://api.openalex.org/works';

  constructor(private http: HttpClient) {}

  getPapers(): Observable<Paper[]> {
    const maxYear = 2025;
    const minYear = 2020;
    const randomYear =
      Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    return this.http
      .get<any>(
        `${this.apiOpenAlexUrl}?filter=publication_year:${randomYear}&per_page=12&select=id,doi,title,publication_year,type,authorships`,
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.results.map((paper: any) => this.compactResults(paper));
        }),
      );
  }

  getPaperById(id: string): Observable<Paper> {
    return this.http
      .get<any>(`${this.apiOpenAlexUrl}/${id}`)
      .pipe(map((paper) => this.compactResults(paper)));
  }

  private compactResults(paper: any): Paper {
    const seed = paper.id.split('/').at(-1);

    const firstAuthor =
      paper.authorships[0]?.author?.display_name ?? 'Unknown Author';

    return {
      id: seed,
      doi: paper.doi,
      title: paper.title,
      publication_year: paper.publication_year,
      type: paper.type,
      author: firstAuthor,
      imageUrl: `https://picsum.photos/seed/${seed}/200`,
    };
  }
}
