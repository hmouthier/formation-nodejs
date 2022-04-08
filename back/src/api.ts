import { Router, json } from "express";
import { Article } from "./interfaces/Article";
import { FileArticleService } from "./services/FileArticles.service";

const articleService = new FileArticleService();
const app = Router();

app.use(json());

app.get("/date", (req, res, next) => {
  console.log("date");
  res.json({ date: new Date() });
});

app.get("/articles", (req, res) => {
  (async () => {
    const articles = await articleService.retrieveAll();
    res.json(articles);
  })();
});

app.post("/articles", (req, res) => {
  (async () => {
    try {
      const article: Article = req.body;
      console.log(article);

      res.status(201).json(articleService.add(article));
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })();
});

app.delete("/articles", (req, res) => {
  (async () => {
    try {
      const ids: string[] = req.body;
      console.log("ids : " + ids);
      await articleService.delete(ids);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })();
});

export const api = app;
