export interface BookResponse {
  books: Book[];
  count: number;
}

export interface Book {
  id: number;
  book_author: string[];
  book_title: string;
  book_publication_year: number;
  book_publication_country: string;
  book_publication_city: string;
  book_pages: number;
}
