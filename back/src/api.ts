import { Router, json } from "express";
import { Article } from "./interfaces/Article";

const app = Router();

app.use(json());
const articles: Article[] = [
  { id: "1", name: "Tondeuse", qty: 1, price: 500 },
  { id: "2", name: "Marteau", qty: 25, price: 7 },
  { id: "3", name: "Pince", qty: 18, price: 3.5 },
];

app.get("/date", (req, res, next) => {
  console.log("date");
  res.json({ date: new Date() });
});

app.get("/articles", (req, res) => {
  res.json(articles);
});
app.post("/articles", (req, res) => {
  (async () => {
    try {
      const article: Article = req.body;
      console.log(article);
      articles.push(article);
      res.status(201).json(article);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  })();
});

export const api = app;
