import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [{ name: 'Pince', price: 3.5, qty: 25 }];
  constructor(private http: HttpClient) {
    this.retrieveAll();
  }
  retrieveAll() {
    this.http.get('http://localhost:3000/api/articles');
  }
}
