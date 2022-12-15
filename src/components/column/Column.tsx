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
import { IComment } from "../../types/types";
import card from "../../assets/images/card.png";

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
    <Container
      className="border border-1 rounded-2"
      style={{backgroundColor: "rgb(237, 232, 232)"}}
    >
      <Row className="p-2">
        <Col
          className="d-sm-flex flex-row justify-content-between border-bottom border-dark mb-1"
        >
          <p><span><strong>{columnTitle}</strong></span></p>
          <DropdownMenu
            columnId={columnId}
          />
        </Col>
      </Row>
      <Row className="p-2">
        <ListGroup className="p-0 border-0">
          <CardItem
            columnId={columnId}
            comments={comments}
          />
        </ListGroup>
      </Row>
      <Row className="p-2">
        {
          !addFormIsShown ?
          <Container
            onClick={handleOpenFormClick}
            className="border border-2 rounded-2 p-2 d-md-flex align-items-center"
            style={{cursor: "pointer"}}
          >
            <img
              src={card}
              alt="add card"  
            />
            {" "}
            <span className="ms-2">Add a card</span>
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
