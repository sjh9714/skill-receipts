import { createServer as createHttpServer, type Server } from "node:http";

const users = [
  { id: "1", name: "Ada" },
  { id: "2", name: "Grace" },
];

export function createServer(): Server {
  return createHttpServer((req, res) => {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not found" }));
  });
}
