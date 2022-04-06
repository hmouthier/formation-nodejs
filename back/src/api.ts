import { Router } from "express";

const app = Router();

app.get("/date", (req, res, next) => {
  console.log("date");
  res.json({ date: new Date() });
});

export const api = app;
