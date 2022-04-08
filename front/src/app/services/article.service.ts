import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [{ name: 'Pince', price: 3.5, qty: 25 }];
  constructor(private http: HttpClient) {}

  retrieveAll() {
    this.http.get<Article[]>('http://localhost:3000/api/articles').subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (err) => {
        console.log('err : ', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  async add(article: Article) {
    await lastValueFrom(
      this.http.post<Article[]>('http://localhost:3000/api/articles', article)
    );
  }

  async remove(articlesToRemove: Set<Article>) {
    const ids = [...articlesToRemove].map((a) => a.id) as string[];
    await lastValueFrom(
      this.http.delete<void>('http://localhost:3000/api/articles', {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: ids,
      })
    );
  }
}
