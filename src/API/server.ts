import { createServer, Model } from "miragejs";
import {v4 as uuid} from "uuid";

createServer({
    models :{
        todos : Model,
    },
    seeds(server){
        server.create("todo", { id: uuid(), text: "Buy wheat", done: false });
        server.create("todo", { id: uuid(), text: "Make bread", done: true });
    },
    routes(){
        this.namespace = "todos";
        this.get("/", (schema) => {
            return schema.db.todos;
          });
    }
}
)