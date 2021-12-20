import React from "react";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  ListGroup,
} from "react-bootstrap";
import ToDoItem from "../Models/todoitem";

interface Props {
    toDoItems : ToDoItem[];
}

function ToDoList({toDoItems} : Props) {
  return (
    <ListGroup as="ol" numbered>
      {toDoItems &&
        toDoItems
          .sort((a, b) => (a.text > b.text ? 1 : -1))
          .map((toDoItem) => (
            <ListGroup.Item
              key={toDoItem.id}
              className="d-flex justify-content-between align-items-center"
              variant={toDoItem.done ? "light" : "warning"}
            >
              {toDoItem.done ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : (
                <FontAwesomeIcon icon={faCircle} color="gray" />
              )}
              <div className="ms-2 me-auto">
                <div className="fw-bold">{toDoItem.text}</div>
              </div>

              <ButtonGroup className="mb-2">
                <Button variant="primary">
                  {toDoItem.done ? "Not Done" : "Done"}
                </Button>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
    </ListGroup>
  );
}

export default ToDoList;
