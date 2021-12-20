import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";
import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

interface Props {
  searchToDos: (text: string, status: boolean) => void;
  loadToDos : () => void;
}

export default function ToDoSearch({ searchToDos, loadToDos }: Props) {
  const [textTarget, setTextTarget] = useState("");
  const [statusTarget, setStatusTarget] = useState(false);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    target.type === "checkbox" ? setStatusTarget(target.checked) : setTextTarget(target.value)
  }

  function handleSearchToDo() {
    searchToDos(textTarget, statusTarget)
    setTextTarget("");
    setStatusTarget(false); 
  }

  return (
    <>
      <Container fluid>
        <Navbar
          bg="light"
          fixed="top"
          className="d-flex justify-content-center align-items-center"
        >
          <Row className="w-50">
            <Col className="d-flex justify-content-start  col-md-4">
              <FontAwesomeIcon color="#679170" size="3x" icon={faTasks} />
              <Navbar.Brand
                className="mx-2"
                href="#"
                style={{
                  fontFamily: "cursive",
                  color: "#679170",
                  fontWeight: "bold",
                }}
              >
                TODO LIST
              </Navbar.Brand>
            </Col>
            <Col className="d-flex justify-content-end col-sm-6 col-md-8">
              <Form className="d-flex">
                <InputGroup>
                  <InputGroup.Checkbox
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    checked={statusTarget}
                    onChange={handleOnChange}
                  />
                  <FormControl
                    type="text"
                    aria-label="Search a todo "
                    style={{ width: "300px" }}
                    placeholder="Check/type to see done/undone tasks ..."
                    value={textTarget}
                    onChange={handleOnChange}
                    required
                  />
                  <Button variant="outline-success" onClick={handleSearchToDo}>Search</Button>
                  <Button variant="outline-primary" onClick={loadToDos}>All</Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Navbar>
      </Container>
    </>
  );
}
