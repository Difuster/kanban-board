import React, { FC, useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.code === "Escape") setShow(false);
    });
  }, [setShow])

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={handleCloseClick}>
        <Modal.Title>Edit title?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSaveClick}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              value={inputValue}
              type="text"
              autoComplete="off"
              onChange={handleOnChange}
              className="me-2"
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
