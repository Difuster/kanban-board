import React, { FC, useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface ModalProps {
  isShown: boolean;
  setIsShown: any;
};

const ModalWindow: FC<ModalProps> = ({isShown, setIsShown}) => {
  const [inputName, setInputName] = useState("Enter your name...");
  const inputEl = useRef<HTMLInputElement>(null!);

  const handleInputName = (e: any) => setInputName(e.target.value);
  
  const handleSetUser = (e: any) => {
    e.preventDefault();
    const name = inputName;
    localStorage.setItem("name", name);
    setIsShown(false);
  };

  useEffect(() => {
    inputEl.current?.select();
  }, [])

  return (
    <Modal
      show={isShown}
    >
      <Modal.Body> 
        <Form onSubmit={handleSetUser}>
          <Form.Group className="mb-3">
            <Form.Label>Emter Name</Form.Label>
            <Form.Control
              name="name"
              value={inputName}
              type="text"
              autoComplete="off"
              onChange={handleInputName}
              ref={inputEl}
              className="me-2"
            />
            <Form.Text className="text-muted">
              Enter your name here
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
