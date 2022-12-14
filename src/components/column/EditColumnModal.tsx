import React, { FC, useState, useEffect, useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Context } from "../../reducer/reducer";
import { renameColumn } from "../../reducer/reducer";

interface EditTitleModalProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  columnId: number;
};

const EditTitleModal: FC<EditTitleModalProps> = ({ show, setShow, columnId }) => {
  const { state, dispatch } = useContext(Context);

  const currentColumn = state.columns.filter(col => col.id === columnId)[0];
  const [inputValue, setInputValue] = useState(currentColumn.title);

  const handleOnChange = (e: any) => setInputValue(e.target.value);

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    const data = { id: columnId, title: inputValue }
    dispatch(renameColumn(data));
    setShow(false);
  };

  const handleCloseClick = () => setShow(false);

  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current?.focus();
  })

  return (
    <Modal show={show} onEscapeKeyDown={() => setShow(false)}>
      <Modal.Header closeButton onHide={handleCloseClick}>
        <Modal.Title>Edit List Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSaveClick}>
          <Form.Group className="mb-3">
            <Form.Control
              name="title"
              value={inputValue}
              type="text"
              autoComplete="off"
              onChange={handleOnChange}
              className="me-2"
              ref={inputRef}
            />
          </Form.Group>
          <Button
            variant="secondary"
            onClick={handleCloseClick}
          >
            Close
          </Button>
          {" "}
          <Button
            variant="primary"
            type="submit"
            onClick={handleSaveClick}
          >
            Save changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTitleModal;
