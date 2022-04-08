import { Article } from "../interfaces/Article";
import { v4 as uuidv4 } from "uuid";

let articles: Article[] = [
  { id: "1", name: "Tondeuse", qty: 1, price: 500 },
  { id: "2", name: "Marteau", qty: 25, price: 7 },
  { id: "3", name: "Pince", qty: 18, price: 3.5 },
];

export class RAMArticleService {
  async retrieveAll() {
    return articles;
  }

  add(article: Article) {
    const addedArticle = { ...article };
    addedArticle.id = uuidv4();
    articles.push(addedArticle);
    return addedArticle;
  }
  delete(ids: string[]) {
    articles = articles.filter((a) => !ids.includes(a.id));
  }
}
