import cors from "cors";
import express from "express";
import { createServer, Server } from "http";
import serveIndex from "serve-index";
import { api } from "./api";

export class WebServer {
  server: Server;
  port = +process.env.PORT || 1000;
  constructor() {
    const app = express();
    const wwwDir = "./public";

    app.use((req, res, next) => {
      console.log("req : ", req.url);
      next();
    });
    app.use(cors());

    app.use("/api", api);

    app.use(express.static(wwwDir));
    app.use(serveIndex(wwwDir, { icons: true }));
    this.server = createServer(app);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Example app listening on ports ${this.port}`);
    });
  }

  stop() {
    this.server.close((err) => {
      if (err) {
        console.log("err : ", err);
      }
    });
  }
}
