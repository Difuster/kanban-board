import React, { FC, useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Context } from "../../reducer/reducer";
import { renameCard } from "../../reducer/reducer";

interface EditTitleModalProps {
  cardId: number,
  show: boolean,
  setShow: (arg0: boolean) => void,
}

const EditTitleModal: FC<EditTitleModalProps> = ({ cardId, show, setShow }) => {
  const { state, dispatch } = useContext(Context);
  const currentCard = state.cards.filter(card => card.id === cardId)[0];
  const [inputValue, setInputValue] = useState(currentCard.title);

  const inputRef = useRef<HTMLInputElement>(null!);

  const handleSaveTitle = () => {
    dispatch(renameCard(cardId, inputValue));
    setShow(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  })

  return (
    <Modal show={show} onEscapeKeyDown={() => setShow(false)}>
      <Container>
        <Modal.Header closeButton
          className="mb-3"
          onHide={() => setShow(false)}
        >
          Edit Card Title
        </Modal.Header>
        <Form.Control
          onChange={(e) => setInputValue(e.target.value)}
          name="description"
          type="text"
          value={inputValue}
          autoComplete="off"
          className="me-2 mb-3 rounded"
          ref={inputRef}
        />
        <Button
          className="mb-3"
          type="submit"
          variant="success"
          onClick={handleSaveTitle}
        >
          Save
        </Button>
      </Container>
    </Modal>
  )
};

export default EditTitleModal;

