import React, { FC, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { IComment } from "../../types/types";

interface EditCommentModalProps {
  show: boolean;
  setShow: any,
  comment: IComment,
  comments: IComment[]
  setComments: any;
}

const EditCommentModal: FC<EditCommentModalProps> = ({
  show, setShow, comment, comments, setComments,
}) => {
  const [inputValue, setInputValue] = useState(comment.text);

  const handleSaveComment = (e: any) => {
    e.preventDefault();
    const newComments = comments.map((com) => {
      if (com.id === comment.id) {
        com.text = inputValue;
      }
      return com;
    });
    setComments(newComments);
    setShow(false);
  };

  return (
    <Modal show={show} centered onEscapeKeyDown={() => setShow(false)} backdrop="static" keyboard={false}>
      <Container
        className="border border-2 border-primary rounded text-white"
        style={{backgroundColor: "rgb(64, 145, 216)"}}>
        <Modal.Header closeButton
          className="mb-3"
          onHide={() => setShow(false)}
        >
          Edit Comment
        </Modal.Header>
        <Form.Control
          onChange={(e) => setInputValue(e.target.value)}
          name="description"
          type="text"
          value={inputValue}
          autoComplete="off"
          className="me-2 mb-3 rounded"
        />
        <Button
          className="mb-3"
          type="submit"
          variant="success"
          onClick={handleSaveComment}
        >
          Save
        </Button>
      </Container>
    </Modal>
  )
};

export default EditCommentModal;

