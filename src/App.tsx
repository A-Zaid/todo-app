import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ToDoList from "./Components/ToDoList";
import ToDoSearch from "./Components/ToDoSearch";
import ToDoItem from "./Models/todoitem";

function App() {
  const [toDoItems, setTodoItems] = useState<ToDoItem[] | undefined>([]);

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadTodos() {
    fetch("/todos")
      .then((res) => res.json())
      .then((data) => setTodoItems(data))
      .catch((error) => console.log("Error fetching todos", error));
  }

  function addToDoItem(newToDoItem: ToDoItem) {
    fetch("/todos", {
      method: "POST",
      body: JSON.stringify({
        id: newToDoItem.id,
        text: newToDoItem.text,
        done: newToDoItem.done,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const todo: ToDoItem = result;
        toDoItems ? setTodoItems([...toDoItems, todo]) : setTodoItems([todo]);
        console.log(result);
      })
      .catch((error) => {
        console.log("Error adding todo item.", error);
      });
  }

  function updateStatusItem(id: string) {
    if (toDoItems) {
      let item = toDoItems.find((x) => x.id === id);
      if (item) {
        item.done = item.done ? false : true;

        fetch(`/todos/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            done: item.done,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            const todo: ToDoItem = result;
            setTodoItems([...toDoItems.filter((x) => x.id !== id), todo]);
            console.log(result);
          })
          .catch((error) => {
            console.log("To do item not found", error);
          });
      }
    }
  }

  function deleteToDoItem(id: string) {
    fetch(`/todos/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        setTodoItems(result);
      })
      .catch((error) => {
        console.log("Todo item not found", error);
      });
  }

  function searchToDos(text: string, status: boolean) {
    console.log(`text '${text}' status ${status}`)
    if (toDoItems) {
      if (text === "" && !status )
      loadTodos();
      else {
        let itemsSearched : ToDoItem[] = toDoItems.filter((x) => x.text.toLowerCase().includes(text.toLowerCase()) && x.done === status);
        setTodoItems(itemsSearched);
      }
    }
  }

  return (
    <>
    <ToDoSearch searchToDos={searchToDos} loadToDos={loadTodos} />
      <Container style={{ marginTop: "7em" }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <ToDoList
              toDoItems={toDoItems}
              addToDoItem={addToDoItem}
              updateStatusItem={updateStatusItem}
              deleteToDoItem={deleteToDoItem}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
