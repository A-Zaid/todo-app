import React, { ChangeEvent, useState } from "react";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import ToDoItem from "../Models/todoitem";
import {v4 as uuid} from "uuid";

interface Props {
  toDoItems: ToDoItem[] | undefined;
  addToDoItem: (newToDoItem: ToDoItem) => void;
  updateStatusItem: (id: string) => void;
  deleteToDoItem: (id: string) => void;
}

function ToDoList({
  toDoItems,
  addToDoItem,
  updateStatusItem,
  deleteToDoItem,
}: Props) {
  const [textItem, setTextItem] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setTextItem(event.target.value);
  }

  function handleAddToDoItem() {
    if (textItem) {
        const newItem: ToDoItem = {
          id: uuid(),
          text: textItem,
          done: false,
        };
        addToDoItem(newItem);
        setTextItem("");
      }
  }
  return (
    <ListGroup as="ol" numbered>
      <ListGroup.Item className="d-flex align-items-center">
        <InputGroup>
          <Form.Control
            onChange={handleInputChange}
            placeholder="type a todo item ..."
            required
            autoFocus
            value={textItem}
          />
          <Button
            as="input"
            type="button"
            value="Add"
            onClick={handleAddToDoItem}
          />
        </InputGroup>
      </ListGroup.Item>
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
                <Button
                  variant="primary"
                  onClick={() => updateStatusItem(toDoItem.id)}
                >
                  {toDoItem.done ? "Not Done" : "Done"}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteToDoItem(toDoItem.id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
    </ListGroup>
  );
}

export default ToDoList;
