import type { IncomingMessage, ServerResponse } from "node:http";
import { match } from "path-to-regexp";

type Handler = (req: IncomingMessage & { params: Record<string, string> }, res: Res) => void;
type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

interface Res extends ServerResponse {
  json(body: unknown, spaces?: number): void;
  notFound(): void;
}

export class Router {
  private readonly routes: Array<{ matcher: ReturnType<typeof match>; handler: Handler }> = [];
  private readonly middlewares: Middleware[] = [];

  use(mw: Middleware): void {
    this.middlewares.push(mw);
  }

  get(pattern: string, handler: Handler): void {
    this.routes.push({ matcher: match(pattern), handler });
  }

  handle(req: IncomingMessage, res: ServerResponse): void {
    const decorated = res as Res;
    decorated.json = (body, spaces) => {
      decorated.writeHead(200, { "content-type": "application/json" });
      decorated.end(JSON.stringify(body, null, spaces));
    };
    decorated.notFound = () => {
      decorated.writeHead(404, { "content-type": "application/json" });
      decorated.end(JSON.stringify({ error: "not found" }));
    };
    let i = 0;
    const next = (): void => {
      if (i < this.middlewares.length) this.middlewares[i++](req, res, next);
      else this.dispatch(req, decorated);
    };
    next();
  }

  private dispatch(req: IncomingMessage, res: Res): void {
    for (const route of this.routes) {
      const m = route.matcher(req.url ?? "");
      if (m && req.method === "GET") {
        route.handler(Object.assign(req, { params: m.params as Record<string, string> }), res);
        return;
      }
    }
    res.notFound();
  }
}
