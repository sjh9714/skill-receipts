// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import { createServer as createHttpServer, type Server } from "node:http";
import { Router } from "./router.js";

const users = [
  { id: "1", name: "Ada" },
  { id: "2", name: "Grace" },
];

export interface ServerOptions {
  jsonSpaces?: number;
}

export function createServer(options: ServerOptions = {}): Server {
  const router = new Router();
  router.use((req, _res, next) => {
    // logging middleware
    void req.url;
    next();
  });
  router.get("/health", (_req, res) => res.json({ ok: true }));
  router.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (user) res.json(user, options.jsonSpaces);
    else res.notFound();
  });
  return createHttpServer((req, res) => router.handle(req, res));
}
