import React, { FC, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import CardItem from "../card/CardItem";
import DropdownMenu from "./Dropdown";
import "../style.css";
import { addCard } from "../../reducer/reducer";
import { ICard, IComment } from "../../types/types";

interface ColumnsProps {
  columnId: number;
  columnTitle: string;
  comments: IComment[];
  dispatch: any;
};

const Column: FC<ColumnsProps> = (value) => {
  const { columnId, columnTitle, comments, dispatch } = value;

  const [inputValue, setInputValue] = useState("");
  const [addFormIsShown, setAddFormIsShown] = useState(false);

  const inputEl = useRef<HTMLInputElement>(null!);

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newCard = {
      columnId: columnId,
      id: Math.random(),
      title: inputValue,
      description: "",
      userId: 1,
    };
    dispatch(addCard(newCard));
    setInputValue("");
    setAddFormIsShown(false);
  };

  const handleFocus = () => {
    inputEl.current?.select();
  };

  const handleOpenFormClick = () => {
    setAddFormIsShown(true);
  };

  const handleCloseFormClick = () => {
    setAddFormIsShown(false);
  };

  return (
    <Container>
      <Row className="border-color-grey p-2">
        <Col className="disp-fl-row column__header">
          <p>{columnTitle}</p>
          <DropdownMenu
            columnId={columnId}
          />
        </Col>
      </Row>
      <Row className="border-color-grey p-2">
        <ListGroup className="p-0 border-0">
          <CardItem
            columnId={columnId}
            comments={comments}
          />
        </ListGroup>
      </Row>
      <Row className="border-color-grey p-2">
        {
          !addFormIsShown ?
          <Container
            onClick={handleOpenFormClick}
            className="column__add-card"
          >
            + Add a card
          </Container> :
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="card"
                placeholder="Enter title for this card..."
                type="text"
                autoComplete="off"
                onChange={handleInput}
                className="me-2"
                ref={inputEl}
                onClick={handleFocus}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              size="sm"
            >
              Add Card
            </Button>{" "}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleCloseFormClick}
            >
              X
            </Button>
          </Form>
        }
      </Row>
    </Container>
  )
};

export default Column;
