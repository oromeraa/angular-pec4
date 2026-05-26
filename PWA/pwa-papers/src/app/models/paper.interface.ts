export interface Paper {
  id: string;
  doi: string | null;
  title: string;
  publication_year: number;
  type: string;
  author: string;
  imageUrl: string;
}
