import React, {FC, useState, useRef} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardItem from "../Card";
import DropdownMenu from "./Dropdown";
import "../style.css";

interface column {
  id: number;
  name: string;
};

interface ColumnProps {
  id: number;
  name: string;
  columns: column[];
  setColumns: (arg: column[]) => void;
};

interface card {
  columnId: number,
  id: number,
  text: string,
};

const Column: FC<ColumnProps> = ({id, name, columns, setColumns}) => {
  const [cards, setCards] = useState<card[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [addFormIsShown, setAddFormIsShown] = useState(false);

  const inputEl = useRef<HTMLInputElement>(null);

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleCards = (e: any) => {
    e.preventDefault();
    const newCards = [
      ...cards,
      {
        columnId: id,
        id: Math.random(),
        text: inputValue,
      }
    ];
    setInputValue("");
    setCards(newCards);
    setAddFormIsShown(false);
  };

  const handleFocus = () => {
    inputEl.current?.select();
  };

  const handleOpenFormClick = (e: any) => {
    setAddFormIsShown(true);
  };

  const handleCloseFormClick = (e: any) => {
    setAddFormIsShown(false);
  }

  return (
    <div className="column">
      <div className="disp-fl-row column__header">
        <h2>{name}</h2>
        <DropdownMenu
          columnId={id}
          columns={columns}
          setColumns={setColumns}
        />
      </div>
      {cards.map((card) => {
        return (
          <CardItem
            key={card.id}
            columnId={card.columnId}
            id={card.id}
            text={card.text}
          />
        )
      })}
      {
        !addFormIsShown ?
        <div onClick={handleOpenFormClick} className="column__add-card">+ Add a card</div> :
        <Form onSubmit={handleCards}>
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
          <Button variant="success" type="submit" size="sm">
            Add Card
          </Button>{' '}
          <Button variant="outline-danger" size="sm" onClick={handleCloseFormClick}>
            X
          </Button>
        </Form>
      }
    </div>
  )
};

export default Column;
