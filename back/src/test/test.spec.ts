import assert from "assert";
import { WebServer } from "../WebServer";

describe("Stock", function () {
  describe("server", function () {
    it("should start and stop", async () => {
      process.env.PORT = "3232";
      const server = new WebServer();
      server.start();
      server.stop();
    });
  });
});
