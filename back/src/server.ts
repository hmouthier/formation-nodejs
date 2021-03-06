import express from "express";
import serveIndex from "serve-index";
import { api } from "./api";
import cors from "cors";

const app = express();
const port = +process.env.PORT || 1000;
const wwwDir = "./public";

app.use((req, res, next) => {
  console.log("req : ", req.url);
  next();
});
app.use(cors());

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

// app.get("/*", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on ports ${port}`);
});
