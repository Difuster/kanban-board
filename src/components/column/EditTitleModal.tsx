import React, {FC, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface column {
  id: number;
  name: string;
};

interface EditTitleModalProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  columnId: number;
  columns: column[];
  setColumns: (arg: column[]) => void;
}

const EditTitleModal: FC<EditTitleModalProps> = ({show, setShow, columnId, columns, setColumns}) => {
  const currColumn = columns.filter(col => col.id === columnId);
  const [title, setTitle] = useState(currColumn[0].name);

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    const editedColumns = columns.map((col) => {
      if (col.id === columnId) {
        col.name = title;
      }
      return col;
    });
    setColumns(editedColumns);
    setShow(false);
  };

  const handleCloseClick = () => {
    setShow(false);
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Edit title?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSaveClick}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              value={title}
              type="text"
              autoComplete="off"
              onChange={handleTitle}
              className="me-2"
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleCloseClick}>Close</Button>{" "}
          <Button variant="primary" type="submit" onClick={handleSaveClick}>Save changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTitleModal;
