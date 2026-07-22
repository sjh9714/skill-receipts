`src/server.ts` contains a small dependency-free HTTP server with a `/health`
route and an in-memory `users` list.

Add a route `GET /users/:id` that responds 200 with the matching user as JSON
(`content-type: application/json`), or 404 with the server's existing
not-found response when no user has that id. Keep everything else as it is.
