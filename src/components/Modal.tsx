import React, {FC, useState, useRef, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface ModalProps {
  isShown: boolean;
  handleUser: any;
}

const ModalWindow: FC<ModalProps> = ({isShown, handleUser}) => {
  const [inputName, setInputName] = useState("Ваше имя...");
  const inputEl = useRef<HTMLInputElement>(null);

  const handleInputName = (e: any) => {
    setInputName(e.target.value);
  };

  const setName = (e: any) => {
    e.preventDefault();
    handleUser(inputName);
  };

  useEffect(() => {
    inputEl.current?.select();
  }, [])

  return (
    <Modal
      show={isShown}
    >
      <Modal.Body> 
        <Form onSubmit={setName}>
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
            <Form.Text className="text-muted" >
              Enter your name here
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
