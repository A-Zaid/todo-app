import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ToDoList from "./Components/ToDoList";
import ToDoItem from "./Models/todoitem";

function App() {
  const [toDoItems, setTodoItems] = useState<ToDoItem[]>([]);

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
  return (
    <>
      <Container style={{ marginTop: "7em" }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <ToDoList toDoItems={toDoItems} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
