import express from "express";
import cors from "cors";
import CreateDatabase from "./database/database";
import { Todo } from "./database/interface";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

const TodosDB = CreateDatabase<Todo>();

app.get("/todos", (req, res) => {
  const data = TodosDB.instance.getAll();
  const { prop } = TodosDB.instance.countProprety((todo) => {
    if (!todo.isCompleted) {
      return 1;
    }
    return 0;
  });
  const body = {
    data,
    prop,
  };
  res.send(body);
});

app.post("/todos", (req, res) => {
  const { value, isCompleted, id } = req.body;
  const todo: Todo = {
    isCompleted,
    value,
    id,
  };
  const newid = TodosDB.instance.set(todo);
  if (newid == undefined) {
    res.status(500).send("Couldn't create a new Todo");
  } else {
    res.status(201).send(TodosDB.instance.get(newid));
  }
});

app.delete("/todos/:id", (req, res) => {
  if (req.params.id === "all") {
    TodosDB.instance.visit((todo) => {
      if (todo.isCompleted && todo.id) {
        TodosDB.instance.delete(todo.id);
      }
    });
    res.status(200).send("All completed removed");
  } else {
    const id = parseInt(req.params.id);
    TodosDB.instance.delete(id);
    res.status(200).send("Todo removed");
  }
});

app.patch("/todos", (req, res) => {
  const { status } = req.body;
  TodosDB.instance.visit((todo) => {
    todo.isCompleted = status;
  });
  res.send(200).send("Status changed");
});

app.listen(4000, () => {
  console.log("Listening in port 4000 Todos");
});
