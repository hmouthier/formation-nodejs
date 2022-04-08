import { Article } from "../interfaces/Article";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

let articles: Article[] = [
  { id: "1", name: "Tondeuse", qty: 1, price: 500 },
  { id: "2", name: "Marteau", qty: 25, price: 7 },
  { id: "3", name: "Pince", qty: 18, price: 3.5 },
];
const JSON_FILE = "data/articles.json";

const init = () => {
  if (fs.existsSync(JSON_FILE)) {
    const str = fs.readFileSync(JSON_FILE, { encoding: "utf8" });
    articles = JSON.parse(str);
  }
};

const save = async () => {
  fs.promises.writeFile(JSON_FILE, JSON.stringify(articles));
};

export class FileArticleService {
  async retrieveAll() {
    return articles;
  }

  async add(article: Article) {
    const addedArticle = { ...article };
    addedArticle.id = uuidv4();
    articles.push(addedArticle);
    await save();
    return addedArticle;
  }
  async delete(ids: string[]) {
    articles = articles.filter((a) => !ids.includes(a.id));
    await save();
  }
}
