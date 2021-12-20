import { createServer, Model } from "miragejs";
import { v4 as uuid } from "uuid";

createServer({
  models: {
    todos: Model,
  },
  seeds(server) {
    server.create("todo", { id: uuid(), text: "Buy wheat", done: false });
    server.create("todo", { id: uuid(), text: "Make bread", done: true });
  },
  routes() {
    this.namespace = "todos";
    this.get("/", (schema) => {
      return schema.db.todos;
    });
    this.post("/", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.todos.insert(attrs);
      });
    this.put("/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      return schema.db.todos.update(request.params.id, newAttrs);
    });
    this.del("/:id", (schema, request) => {
      let id = request.params.id;
      schema.db.todos.remove(id);
      return schema.db.todos;
    });
  },
});
