(async () => {
  const Hapi = require("@hapi/hapi");
  const api = require("./Controllers/api");

  const server = Hapi.Server({
    port: "8000",
    host: "0.0.0.0",
    routes: {
      cors: true,
    },
  });

  await server.register(require("@hapi/cookie"));

  server.route({
    method: "GET",
    path: "/",
    handler: (req, reply) => {
      return { name: "John" };
    },
  });

  server.route({
    method: "GET",
    path: "/api",
    handler: (req, reply) => {
      const path = req.query.path;
      const search = req.query.search;
      console.log(path);

      return api.getData(path, search);
    },
  });

  server.route({
    method: "POST",
    path: "/login",
    handler: (req, reply) => {
      const path = req.query.path;
      const search = req.query.search;
      console.log(path);

      if (req.payload) {
        if (
          req.payload.username === "Luke" &&
          req.payload.password === "DadSucks"
        ) {
          return { token: "swapiToken" };
        }
        return {
          err: "invalid credentials ❌",
        };
      } else {
        return {
          err: "Please add credentials ⚠️",
        };
      }
    },
    options: {
      auth: false,
    },
  });

  server.route({
    method: "GET",
    path: "/api/planets",
    handler: (req, reply) => {
      return { name: "John" };
    },
  });

  server.route({
    method: "GET",
    path: "/api/films",
    handler: (req, reply) => {
      return { name: "John" };
    },
  });

  server.route({
    method: "GET",
    path: "/api/species",
    handler: (req, reply) => {
      return { name: "John" };
    },
  });

  server.route({
    method: "GET",
    path: "/api/people",
    handler: (req, reply) => {
      const path = req.query.path;
      const params = req.query;

      // verifier les 404
      return api.getData(path, params);
    },
  });

  server.route({
    method: "*",
    path: "/{any*}",
    handler: function (request, h) {
      return { err: "404 Error! Page Not Found!" };
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
})().catch((e) => {
  console.log(e.message);
  console.log(e.stack);
});
